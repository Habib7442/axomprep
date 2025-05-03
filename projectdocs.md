MathQuest Project Documentation
Project Overview
MathQuest is an interactive, gamified learning platform designed for math students in grades 8–12 (ages ~13–18). It delivers engaging lessons, practice problems, and quests for topics like algebra, geometry, and trigonometry, using a 2D game interface powered by Kaboom.js. Built with Next.js for the frontend and Supabase for the backend, MathQuest combines educational rigor with game mechanics like XP points, badges, and exploration to make learning fun and effective.
Objectives

Create a scalable, user-friendly platform aligned with math curricula (e.g., Common Core or CBSE).
Use Kaboom.js to deliver a 2D game experience where students solve math problems to progress.
Implement varied question types (input-based, MCQs, drag-and-drop, graphing, word problems, proofs) for diverse learning.
Track progress and rewards in Supabase, with real-time features for engagement.
Follow a phased development approach to deliver a minimum viable product (MVP) and iterate.

Target Audience

Students in grades 8–12 seeking to master math concepts.
Teachers or tutors needing supplemental tools.
Parents looking for engaging educational resources.

Tech Stack

Frontend: Next.js (React), Tailwind CSS, Kaboom.js (for 2D game elements), KaTeX (for math rendering).
Backend: Supabase (PostgreSQL, Authentication, Realtime, Storage, Edge Functions).
APIs: Supabase REST API, Next.js API routes for custom logic (e.g., problem generation).
Hosting: Vercel (Next.js), Supabase (backend).
Third-Party Tools:
Stripe (for premium subscriptions, Phase 3).
Discord or Discourse (for community features, Phase 4).
Desmos or Plotly (for graphing questions, Phase 2).

Features
User-Facing Features

Lessons: Structured content with explanations, examples, and problems, rendered with KaTeX.
Practice Mode: Freely solve problems by topic or grade, with adaptive difficulty.
Quests: Themed challenges (e.g., “Solve 10 linear equations”) with bonus rewards.
Game Interface: Kaboom.js-powered 2D world where students navigate a map, interact with NPCs, and solve problems to progress.
Progress Tracking: Dashboard showing XP, badges, completed lessons, and recommendations.
Community: Forum for discussions, integrated with Supabase or Discord (Phase 4).
Responsive Design: Accessible on desktops, tablets, and mobiles.

Admin Features

CRUD interface for managing lessons, problems, and quests.
User analytics and moderation tools for forum posts.

Monetization

Freemium model: Free basic content, premium subscription for unlimited access and advanced features.
Monthly/annual plans with a 30-day money-back guarantee (Phase 3).

Game Mechanics (Kaboom.js)
MathQuest uses Kaboom.js to create a 2D game world where math problems are integrated into an adventure narrative. Students control a character (e.g., a “Math Adventurer”) to explore, solve challenges, and earn rewards.
Core Mechanics

World Map:
A 2D tile-based map (e.g., “Algebra Island”) represents the curriculum, with areas for each topic (e.g., Linear Equations Village).
Students move their character using keyboard inputs, unlocking areas by completing lessons or quests.

Scenes:
Lessons and quests are scenes (e.g., a “Puzzle Tower” for solving equations) with sprites (NPCs, objects) and animations.
Example: Solving a problem opens a gate with a sparkle animation.

Question Integration:
Problems (input-based, MCQs, etc.) appear as game challenges (e.g., a “Math Sage” NPC presents “Solve 2x = 8”).
Correct answers trigger rewards (e.g., XP coins); incorrect answers show hints with subtle animations (e.g., character stumbles).

Progression:
XP points (stored in Supabase) increase the character’s level, visualized as a health bar or rank.
Badges are collectible items (e.g., “Quadratic Master” trophy) in an inventory.
Quests are missions (e.g., “Defeat the Equation Dragon” by solving 10 problems).

Adaptive Difficulty:
Supabase tracks performance; correct answers increase problem difficulty (e.g., multi-step equations).

Time Challenges:
Optional timed modes (e.g., “Solve 5 problems in 2 minutes”) in a “Math Arena” scene, with leaderboards.

Social Features:
Share achievements (e.g., “Unlocked Geometry Galaxy!”) on the forum.
Multiplayer quests (Phase 4) use Supabase Realtime to sync team progress.

Question Types in Game Context

Input-Based: Type answers (e.g., “x = 4” for “4x = 16”) into a dialogue box to open a chest.
MCQs: Choose a portal (e.g., slope options for “y = 2x + 3”) to advance.
Drag-and-Drop: Arrange steps (e.g., solving “3x = 12”) on a workbench to craft a solution.
Graphing: Plot points (e.g., “y = x + 1”) on a grid to form a constellation, using Desmos integration.
Word Problems: Solve NPC quests (e.g., “Calculate speed = 60 miles ÷ 2 hours”).
Proofs: Select steps (e.g., Pythagorean theorem) to unlock a “knowledge crystal.”

Architecture
Frontend (Next.js)

Pages:
/: Homepage with hero, course catalog, and sign-up CTA.
/lessons: List of lessons by grade/topic.
/lesson/[id]: Lesson content with Kaboom.js scene for problems.
/game/[topic]: Kaboom.js game world for a topic (e.g., algebra).
/dashboard: Progress, XP, badges, and game stats.
/practice: Practice mode with random problems.
/community: Forum (Phase 4).
/admin: Content/user management (protected).

Components:
GameCanvas: Embeds Kaboom.js for game scenes.
ProblemSolver: Renders questions (input, MCQ, etc.) in game or non-game mode.
MathRenderer: KaTeX for equations.
ProgressBar: Visualizes XP and lesson completion.

State Management: Zustand for user/game state; SWR for Supabase data.

Backend (Supabase)

Database Schema:
users: id, email, username, role, xp, level, badges, subscription_status.
lessons: id, title, description, grade, topic, content_markdown.
problems: id, lesson_id, type, question, answer, difficulty, hints, game_context.
quests: id, title, description, required_problems, xp_reward.
user_progress: user_id, lesson_id, problem_id, status, timestamp.
badges: id, title, description, criteria.
user_badges: user_id, badge_id, earned_at.
posts: id, user_id, title, content, created_at (Phase 4).

Authentication: Supabase Auth (email, Google, GitHub) with RBAC.
Realtime: Leaderboards, multiplayer quests (Phase 4).
Storage: Lesson images, user avatars.
Functions: Edge Functions for dynamic problem generation.

APIs

Supabase REST:
GET /lessons: Fetch lessons.
GET /problems: Fetch problems for lessons/practice.
POST /user_progress: Update XP, progress.

Next.js API Routes:
/api/generate-problem: Randomize problem parameters.
/api/validate-answer: Check answers, return feedback.

Development Phases
The project is divided into five phases, each building on the previous to deliver a functional platform incrementally. Estimated timelines assume a single developer working part-time (~20 hours/week).
Phase 1: Foundation and MVP (4–6 Weeks)
Goal: Build a basic platform with lessons, problems, and a simple Kaboom.js game scene.Tasks:

Setup:
Initialize Next.js project with Tailwind CSS and KaTeX.
Set up Supabase project, define schema (users, lessons, problems, user_progress).
Configure Vercel for deployment.
Install Kaboom.js and test a basic scene.

Frontend:
Create pages: / (homepage), /lessons, /lesson/[id], /dashboard.
Build components: Header, LessonCard, ProblemSolver (input-based, MCQ), MathRenderer.
Embed Kaboom.js in a GameCanvas component for one scene (e.g., “Linear Equations Village”).

Backend:
Implement Supabase Auth (email login).
Create API endpoints for fetching lessons/problems and updating progress.
Set up RLS policies for secure data access.

Game Mechanics:
Develop a single Kaboom.js scene with a character sprite, NPC, and one input-based problem (e.g., “Solve 2x = 8” to open a gate).
Display XP coins for correct answers, stored in Supabase.

Content:
Add 5 lessons for Grade 8 (e.g., pre-algebra: linear equations) with 5 problems each (input-based, MCQs).

Testing:
Test authentication, lesson rendering, problem solving, and game scene.
Ensure KaTeX renders equations correctly.

Deliverables:

Deployed MVP with 5 lessons, 25 problems, and one Kaboom.js scene.
Functional dashboard showing XP and progress.
Secure user authentication.

Timeline: 4–6 weeks.
Phase 2: Enhanced Gameplay and Question Types (6–8 Weeks)
Goal: Expand game mechanics, add more question types, and introduce quests.Tasks:

Frontend:
Add /game/[topic] page for a Kaboom.js world map (e.g., Algebra Island).
Extend ProblemSolver for drag-and-drop and graphing questions (use Desmos for graphing).
Create ProgressBar and badge display components.

Backend:
Add quests and badges tables to Supabase.
Implement API for quest completion and badge awards.
Create Edge Function for dynamic problem generation (e.g., randomize “ax + b = c”).

Game Mechanics:
Develop a world map with 3 areas (e.g., Linear Equations, Quadratics, Exponents).
Add 3 Kaboom.js scenes (e.g., a “Puzzle Chest” for drag-and-drop, a “Star Grid” for graphing).
Implement character leveling (XP-based) and badge collection (e.g., “Linear Master” trophy).
Add animations for correct/incorrect answers (e.g., sparkles, shake).

Content:
Add 10 lessons (Grades 8–9: algebra I, basic geometry) with 50 problems (mix of input-based, MCQs, drag-and-drop, graphing).
Create 3 quests (e.g., “Solve 10 equations”).

Testing:
Test new question types, quest completion, and map navigation.
Optimize Kaboom.js performance for mobile devices.

Deliverables:

World map with 3 areas and 3 game scenes.
Support for drag-and-drop and graphing questions.
15 lessons, 75 problems, 3 quests, and badge system.

Timeline: 6–8 weeks.
Phase 3: Monetization and Practice Mode (4–6 Weeks)
Goal: Add freemium model, practice mode, and polish user experience.Tasks:

Frontend:
Add /practice page for random or topic-specific problems.
Implement premium content gates (e.g., lock advanced lessons).
Enhance dashboard with progress graphs and recommendations.

Backend:
Add subscription_status to users table.
Integrate Stripe for monthly/annual subscriptions.
Limit free users to 5 problems/day; unlimited for premium.

Game Mechanics:
Add a “Practice Arena” Kaboom.js scene for timed challenges (e.g., “Solve 5 problems in 2 minutes”).
Introduce adaptive difficulty (Supabase tracks performance to adjust problem complexity).

Content:
Add 5 lessons (Grade 10: geometry, trigonometry) with 25 problems (include word problems).
Create 2 advanced quests for premium users.

Testing:
Test subscription flow, practice mode, and timed challenges.
Ensure premium content is secure.

Deliverables:

Practice mode with timed challenges.
Freemium model with Stripe integration.
20 lessons, 100 problems, 5 quests.

Timeline: 4–6 weeks.
Phase 4: Community and Advanced Features (6–8 Weeks)
Goal: Add community features, proofs, and multiplayer quests.Tasks:

Frontend:
Create /community page with forum interface.
Add leaderboard component for top XP earners.
Extend ProblemSolver for proof questions (select steps).

Backend:
Add posts table for forum content.
Enable Supabase Realtime for leaderboards and multiplayer quests.
Implement moderation tools for forum posts.

Game Mechanics:
Add a “Community Hall” Kaboom.js scene where students share badges or join multiplayer quests.
Implement a multiplayer quest (e.g., “Team up to solve 20 problems”) with real-time progress.
Add proof questions as “Scribe Challenges” (e.g., prove Pythagorean theorem).

Content:
Add 5 lessons (Grades 11–12: pre-calculus) with 25 problems (include proofs).
Create 2 multiplayer quests.

Testing:
Test forum, leaderboards, and multiplayer functionality.
Ensure real-time updates are smooth.

Deliverables:

Community forum and leaderboards.
Multiplayer quests and proof questions.
25 lessons, 125 problems, 7 quests.

Timeline: 6–8 weeks.
Phase 5: Polish and Scale (4–6 Weeks)
Goal: Optimize, add content, and prepare for launch.Tasks:

Frontend:
Improve accessibility (ARIA labels, keyboard navigation).
Add animations for transitions between Kaboom.js scenes.
Optimize for SEO using Next.js SSG.

Backend:
Add indexes to Supabase tables for faster queries.
Implement analytics (Vercel or Google Analytics) for user engagement.

Game Mechanics:
Polish world map with more areas (e.g., Trigonometry Towers).
Add cosmetic rewards (e.g., character skins) for premium users.

Content:
Add 5 lessons (Grades 8–12 review) with 25 problems.
Create 3 final quests for endgame content.

Testing:
Conduct user testing with students to refine gameplay.
Stress-test Supabase for 1,000 concurrent users.

Launch Prep:
Create marketing page on /.
Set up Discord for community support.

Deliverables:

Polished platform with 30 lessons, 150 problems, 10 quests.
Optimized performance and accessibility.
Ready for public launch.

Timeline: 4–6 weeks.
Total Timeline

Duration: 24–34 weeks (~6–8 months) for all phases.
Assumption: Part-time development (20 hours/week). Full-time could reduce to 4–6 months.

Development Guidelines

Coding Standards:
Use TypeScript for type safety.
Follow Next.js conventions for routing and components.
Keep Kaboom.js scenes modular (one per lesson/quest).

Security:
Enable Supabase RLS for all tables.
Sanitize inputs to prevent XSS/SQL injection.
Use environment variables for API keys.

Performance:
Optimize Kaboom.js sprites for low-res devices.
Cache Supabase queries with SWR.
Use Next.js SSG for static pages.

Accessibility:
Ensure Kaboom.js controls are keyboard-friendly.
Add ARIA labels for equations and game elements.

Version Control:
Use Git/GitHub with branches per phase (e.g., phase-1-mvp).
Document changes in commit messages.

Resources

Next.js Docs
Supabase Docs
Kaboom.js Docs
KaTeX Docs
Tailwind CSS Docs
Vercel Docs
OpenGameArt (for sprites)

Risks and Mitigation

Risk: Kaboom.js performance on low-end devices.
Mitigation: Use lightweight sprites, test on budget phones.

Risk: Complex Supabase schema slows queries.
Mitigation: Add indexes, optimize queries early.

Risk: Students find gameplay distracting.
Mitigation: Test with a small group, balance game vs. math focus.

Contact
For questions, create issues in the project’s GitHub repository or join the MathQuest Discord (to be set up in Phase 4).
