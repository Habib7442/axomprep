'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Award, RefreshCw } from 'lucide-react'

// Define vocabulary data
const vocabularyData = [
  { word: "Percentage", definition: "A number or ratio expressed as a fraction of 100" },
  { word: "Fraction", definition: "A numerical quantity that is not a whole number" },
  { word: "Decimal", definition: "A number in the decimal system" },
  { word: "Ratio", definition: "The quantitative relation between two amounts" },
  { word: "Proportion", definition: "A part, share, or number considered in comparative relation to a whole" },
  { word: "Interest", definition: "Money paid regularly at a particular rate for the use of money lent" },
  { word: "Principal", definition: "The original sum of money invested or lent" },
  { word: "Discount", definition: "A deduction from the usual cost of something" },
  { word: "Profit", definition: "A financial gain, especially the difference between amount earned and spent" },
  { word: "Loss", definition: "The fact or process of losing something or someone" },
  { word: "Average", definition: "A number expressing the central value in a set of data" },
  { word: "Mean", definition: "The sum of values divided by the number of values" },
  { word: "Median", definition: "The middle value in a sorted list of numbers" },
  { word: "Mode", definition: "The value that appears most often in a set of data" },
  { word: "Range", definition: "The difference between the highest and lowest values" },
  { word: "Variable", definition: "A symbol for a number we don't know yet" },
  { word: "Equation", definition: "A statement that the values of two mathematical expressions are equal" },
  { word: "Formula", definition: "A mathematical rule expressed in a symbolic relationship" },
  { word: "Function", definition: "A relation between a set of inputs and permissible outputs" },
  { word: "Exponent", definition: "The number of times a number is multiplied by itself" }
];

interface WordBalloonPopProps {
  onComplete: (score: number, totalPossible: number) => void;
}

export default function WordBalloonPop({ onComplete }: WordBalloonPopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds game
  const [currentDefinition, setCurrentDefinition] = useState('');
  // We still need currentCorrectWord for game logic even if we don't display it
  const [currentCorrectWord, setCurrentCorrectWord] = useState('');
  const [level, setLevel] = useState(1);
  const [kaplayLoaded, setKaplayLoaded] = useState(false);
  // Using any type for KAPLAY game instance as it doesn't have proper TypeScript definitions
  const gameInstanceRef = useRef<any>(null);

  // Start the game
  const startGame = async () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setLevel(1);

    // Initialize KAPLAY in the next tick after the canvas is rendered
    setTimeout(initKaplay, 0);
  };

  // Initialize KAPLAY
  const initKaplay = async () => {
    if (!canvasRef.current) return;

    try {
      // Dynamically import KAPLAY
      const kaplayModule = await import('kaplay');
      const kaplay = kaplayModule.default;

      // Clear any previous game instance
      if (gameInstanceRef.current) {
        gameInstanceRef.current.quit();
      }

      // Initialize KAPLAY
      const k = kaplay({
        canvas: canvasRef.current,
        background: '#1a2639',
        width: canvasRef.current.width,
        height: canvasRef.current.height,
        scale: 1,
        debug: false,
      });

      gameInstanceRef.current = k;

      // Load balloon sprite
      k.loadSprite("balloon", "/images/balloon.png");

      // Set up game variables
      // Using any[] for balloons as KAPLAY doesn't have proper TypeScript definitions
      let balloons: any[] = [];
      let spawnSpeed = 3; // seconds between balloon spawns (slower)
      let balloonSpeed = 50 + (level * 8); // pixels per second (slower speed)

      // Pick a random definition and correct word
      const randomIndex = Math.floor(Math.random() * vocabularyData.length);
      const currentWord = vocabularyData[randomIndex];
      setCurrentDefinition(currentWord.definition);
      setCurrentCorrectWord(currentWord.word);

      // Create a fixed area at the bottom for the definition
      // First add a background for the definition area
      k.add([
        k.rect(k.width(), 80),
        k.pos(0, k.height() - 80),
        k.color(0, 0, 0), // Black background
        k.opacity(0.7), // With transparency
        k.z(5), // Make sure it's above other elements
        "definitionBackground"
      ]);

      // Add definition text at the bottom
      k.add([
        k.text(currentWord.definition, { size: 16, width: k.width() - 40 }),
        k.pos(k.width() / 2, k.height() - 40),
        k.anchor("center"),
        k.color(1, 1, 1), // White text
        k.z(6), // Make sure it's above the background
        "definition"
      ]);

      // Add score display
      const scoreDisplay = k.add([
        k.text(`Score: ${score}`, { size: 16 }),
        k.pos(10, 10),
        k.color(1, 1, 1),
        "score"
      ]);

      // Function to spawn a balloon
      function spawnBalloon() {
        // Get 4 random words, including the correct one
        const words = getRandomWords(currentWord.word);

        // Random position at the bottom, but not too close to the edges
        const xPos = k.rand(60, k.width() - 60);

        // Start position should be below the screen but above the definition area
        const yPos = k.height() - 90; // Start just above the definition area

        // Random word from our selection
        const word = words[Math.floor(Math.random() * words.length)];

        // Create balloon
        const balloon = k.add([
          k.sprite("balloon"),
          k.pos(xPos, yPos),
          k.anchor("center"),
          k.scale(0.35), // Smaller balloon size
          k.area(),
          k.move(k.UP, balloonSpeed),
          k.opacity(1), // Add opacity component for lifespan to work
          // Don't apply color tint to the balloon sprite
          // k.color(k.rand(0.5, 1), k.rand(0.5, 1), k.rand(0.5, 1)),
          "balloon",
          { word: word }
        ]);

        // Add text on the balloon
        const balloonText = k.add([
          k.text(word, { size: 16, width: 100 }),
          k.pos(balloon.pos.x, balloon.pos.y - 5), // Position text slightly above center for better placement
          k.anchor("center"),
          k.color(0, 0, 0), // Black text
          k.z(2), // Ensure text is above balloon
          "balloonText"
        ]);

        // Store reference to the balloon - using any type for KAPLAY objects
        (balloonText as any).balloon = balloon;

        balloons.push(balloon);

        // Remove balloon when it goes off screen
        balloon.onUpdate(() => {
          if (balloon.pos.y < -50) {
            if (balloon.word === currentWord.word) {
              // Missed the correct balloon
              updateScore(-5);
            }
            k.destroy(balloon);
            balloons = balloons.filter(b => b !== balloon);
          }
        });
      }

      // Get random words for balloons
      function getRandomWords(correctWord: string) {
        const words = [correctWord];
        const availableWords = vocabularyData
          .filter(item => item.word !== correctWord)
          .map(item => item.word);

        // Shuffle and take 3 more words
        for (let i = 0; i < 3; i++) {
          if (availableWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            words.push(availableWords[randomIndex]);
            availableWords.splice(randomIndex, 1);
          }
        }

        // Shuffle the array
        return words.sort(() => Math.random() - 0.5);
      }

      // Update score
      function updateScore(points: number) {
        setScore(prevScore => {
          const newScore = Math.max(0, prevScore + points);
          scoreDisplay.text = `Score: ${newScore}`;
          return newScore;
        });
      }

      // Handle balloon clicks - using any type for KAPLAY objects
      k.onClick("balloon", (balloon: any) => {
        if (balloon.word === currentWord.word) {
          // Correct balloon
          updateScore(10);

          // Visual feedback
          k.add([
            k.text("+10", { size: 20 }),
            k.pos(balloon.pos.x, balloon.pos.y),
            k.anchor("center"),
            k.color(0, 1, 0),
            k.move(k.UP, 100),
            k.opacity(1), // Add opacity component for lifespan to work
            k.lifespan(1)
          ]);

          // Pick a new word and definition
          const randomIndex = Math.floor(Math.random() * vocabularyData.length);
          const newWord = vocabularyData[randomIndex];
          setCurrentDefinition(newWord.definition);
          setCurrentCorrectWord(newWord.word);

          // Update definition text
          k.destroyAll("definition");
          k.add([
            k.text(newWord.definition, { size: 16, width: k.width() - 40 }),
            k.pos(k.width() / 2, k.height() - 40),
            k.anchor("center"),
            k.color(1, 1, 1), // White text
            k.z(6), // Make sure it's above the background
            "definition"
          ]);

          // Increase difficulty every 30 points
          if (score > 0 && score % 30 === 0) {
            setLevel(prevLevel => {
              const newLevel = prevLevel + 1;
              balloonSpeed = 80 + (newLevel * 10);
              spawnSpeed = Math.max(0.5, 2 - (newLevel * 0.2));
              return newLevel;
            });
          }
        } else {
          // Incorrect balloon
          updateScore(-5);

          // Visual feedback
          k.add([
            k.text("-5", { size: 20 }),
            k.pos(balloon.pos.x, balloon.pos.y),
            k.anchor("center"),
            k.color(1, 0, 0),
            k.move(k.UP, 100),
            k.opacity(1), // Add opacity component for lifespan to work
            k.lifespan(1)
          ]);
        }

        // Remove the balloon
        k.destroy(balloon);
        balloons = balloons.filter(b => b !== balloon);
      });

      // Update balloon text positions - using any type for KAPLAY objects
      k.onUpdate("balloonText", (text: any) => {
        if (text.balloon && text.balloon.exists()) {
          // Position text slightly above center for better placement
          text.pos.x = text.balloon.pos.x;
          text.pos.y = text.balloon.pos.y - 5;
        } else {
          k.destroy(text);
        }
      });

      // Spawn balloons periodically
      k.loop(spawnSpeed, () => {
        if (balloons.length < 5) { // Limit max balloons on screen (reduced from 8)
          spawnBalloon();
        }
      });

      // Timer
      k.loop(1, () => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            endGame();
            return 0;
          }
          return prevTime - 1;
        });
      });

      // End game function
      function endGame() {
        k.destroyAll("balloon");
        k.destroyAll("balloonText");
        setGameOver(true);
        onComplete(score, 100); // 100 is the max possible score for this game
      }

      setKaplayLoaded(true);
    } catch (error) {
      console.error("Error initializing KAPLAY:", error);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.quit();
      }
    };
  }, []);

  return (
    <div className="w-full">
      {!gameStarted ? (
        <div className="text-center py-6">
          <h2 className="text-2xl font-serif text-amber-500 mb-4">Word Balloon Pop</h2>
          <p className="text-amber-200 mb-4 font-serif">
            Pop the balloons with the correct words that match the given definition. Be quick before they float away!
          </p>
          <p className="text-amber-300 mb-6 font-serif text-sm">
            <span className="font-bold">How to play:</span> Click on the balloon that contains the word matching the definition shown at the bottom of the screen.
            Correct answers give you 10 points, wrong answers deduct 5 points. The game lasts for 60 seconds.
          </p>
          <Button
            onClick={startGame}
            className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium"
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div>
          {!gameOver ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-amber-300 text-sm">Level: {level}</div>
                <div className="text-amber-300 text-sm">
                  Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
              <Progress value={(timeLeft / 60) * 100} className="mb-4 bg-amber-900/50" />

              <div className="relative bg-[#1a2639] rounded-lg overflow-hidden border-2 border-amber-600 mb-4">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="w-full h-[500px] object-contain mx-auto"
                />

                {!kaplayLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1a2639]/80">
                    <div className="text-amber-400 animate-pulse">Loading game...</div>
                  </div>
                )}
              </div>

              <div className="text-center text-white mb-2">
                <p className="font-serif italic">Find the word that matches this definition:</p>
                <p className="font-medium">{currentDefinition}</p>
                {/* Removed the hint showing the correct word for better gameplay */}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-12 w-12 text-amber-400 mr-3" />
                <h3 className="text-2xl font-serif text-amber-400">Game Results</h3>
              </div>

              <div className="text-5xl font-bold text-amber-300 mb-4">
                {score} points
              </div>

              <p className="text-amber-200 mb-6">
                {score >= 80
                  ? 'Outstanding! You\'re a vocabulary master!'
                  : score >= 50
                    ? 'Good work! Your vocabulary skills are impressive.'
                    : 'Keep practicing! You\'ll improve with more games.'}
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={startGame}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
