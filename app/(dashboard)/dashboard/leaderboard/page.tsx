'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser-client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Trophy, Medal, Star, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LeaderboardUser {
  user_id: string
  username: string
  house: string
  total_score: number
  tests_passed: number
  tests_taken: number
  rank: number
  best_score: number
}

interface UserTestResult {
  id: number
  user_id: string
  test_id: string
  score: number
  total_marks: number
  correct_answers: number
  incorrect_answers: number
  unattempted: number
  time_taken: number
  passed: boolean
  created_at: string
}

interface HouseStats {
  house: string
  total_points: number
  members: number
  tests_passed: number
}

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string>('')
  const [house, setHouse] = useState<string>('gryffindor')
  const [userId, setUserId] = useState<string>('')
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([])
  const [userRank, setUserRank] = useState<number | null>(null)
  const [userTestResults, setUserTestResults] = useState<UserTestResult[]>([])
  const [houseStats, setHouseStats] = useState<HouseStats[]>([])
  const [recentResults, setRecentResults] = useState<any[]>([])

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError) {
          console.error('Authentication error:', authError)
          router.push('/login')
          return
        }

        if (!user) {
          router.push('/login')
          return
        }

        setUserId(user.id)

        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('username, house')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
        } else if (profile) {
          setUsername(profile.username || 'Wizard')
          if (profile.house) {
            setHouse(profile.house)
          }
        }

        // Fetch leaderboard data
        const { data: leaderboardResults, error: leaderboardError } = await supabase
          .from('mock_test_results')
          .select(`
            user_id,
            score,
            passed,
            users!mock_test_results_user_id_fkey (
              username,
              house
            )
          `)
          .order('created_at', { ascending: false })

        if (leaderboardError) {
          console.error('Error fetching leaderboard data:', leaderboardError)
        } else if (leaderboardResults) {
          // Process leaderboard data
          const userScores = new Map<string, {
            total_score: number,
            tests_passed: number,
            tests_taken: number,
            username: string,
            house: string,
            best_score: number
          }>();

          leaderboardResults.forEach((result: any) => {
            const userId = result.user_id;
            const username = result.users?.username || 'Unknown Wizard';
            const house = result.users?.house || 'gryffindor';
            const score = result.score || 0;
            const passed = result.passed || false;

            if (!userScores.has(userId)) {
              userScores.set(userId, {
                total_score: 0,
                tests_passed: 0,
                tests_taken: 0,
                username,
                house,
                best_score: 0
              });
            }

            const userData = userScores.get(userId)!;
            userData.total_score += score;
            userData.tests_taken += 1;
            userData.tests_passed += passed ? 1 : 0;
            userData.best_score = Math.max(userData.best_score, score);
          });

          // Convert to array and sort by total score
          const leaderboard = Array.from(userScores.entries()).map(([userId, data]) => ({
            user_id: userId,
            username: data.username,
            house: data.house,
            total_score: data.total_score,
            tests_passed: data.tests_passed,
            tests_taken: data.tests_taken,
            best_score: data.best_score,
            rank: 0 // Will be calculated below
          }));

          // Sort by total score (descending)
          leaderboard.sort((a, b) => b.total_score - a.total_score);

          // Assign ranks
          leaderboard.forEach((user, index) => {
            user.rank = index + 1;
            if (user.user_id === userId) {
              setUserRank(index + 1);
            }
          });

          setLeaderboardData(leaderboard);

          // Calculate house statistics
          const houseData = new Map<string, HouseStats>();
          ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'].forEach(houseName => {
            houseData.set(houseName, {
              house: houseName,
              total_points: 0,
              members: 0,
              tests_passed: 0
            });
          });

          leaderboard.forEach(user => {
            const houseStats = houseData.get(user.house) || houseData.get('gryffindor')!;
            houseStats.total_points += user.total_score;
            houseStats.members += 1;
            houseStats.tests_passed += user.tests_passed;
          });

          // Convert to array and sort by total points
          const housesArray = Array.from(houseData.values());
          housesArray.sort((a, b) => b.total_points - a.total_points);
          setHouseStats(housesArray);

          // Fetch user's test results
          const { data: userResults, error: userResultsError } = await supabase
            .from('mock_test_results')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (userResultsError) {
            console.error('Error fetching user results:', userResultsError);
          } else {
            setUserTestResults(userResults || []);
          }

          // Fetch recent results for all users
          const { data: recentData, error: recentError } = await supabase
            .from('mock_test_results')
            .select(`
              *,
              users!mock_test_results_user_id_fkey (
                username,
                house
              )
            `)
            .order('created_at', { ascending: false })
            .limit(10);

          if (recentError) {
            console.error('Error fetching recent results:', recentError);
          } else {
            setRecentResults(recentData || []);
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        <span className="ml-2 text-amber-600">Loading leaderboard...</span>
      </div>
    )
  }

  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  // Get house color class
  const getHouseColorClass = (houseName: string) => {
    switch (houseName.toLowerCase()) {
      case 'gryffindor': return 'bg-[#740001] text-[#D3A625]'
      case 'slytherin': return 'bg-[#1A472A] text-[#AAAAAA]'
      case 'ravenclaw': return 'bg-[#0E1A40] text-[#946B2D]'
      case 'hufflepuff': return 'bg-[#ECB939] text-[#372E29]'
      default: return 'bg-amber-700 text-white'
    }
  }

  // Get house badge color
  const getHouseBadgeClass = (houseName: string) => {
    switch (houseName.toLowerCase()) {
      case 'gryffindor': return 'bg-[#740001] text-[#D3A625] border-[#D3A625]'
      case 'slytherin': return 'bg-[#1A472A] text-[#AAAAAA] border-[#AAAAAA]'
      case 'ravenclaw': return 'bg-[#0E1A40] text-[#946B2D] border-[#946B2D]'
      case 'hufflepuff': return 'bg-[#ECB939] text-[#372E29] border-[#372E29]'
      default: return 'bg-amber-700 text-white border-amber-300'
    }
  }

  // Get medal for rank
  const getRankMedal = (rank: number) => {
    if (rank === 1) return <Medal className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />
    return <span className="text-gray-500 font-medium">{rank}</span>
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-800 font-serif">Magical Leaderboard</h1>
          <p className="text-amber-700 mt-2 text-sm sm:text-base">
            Compare your magical prowess with wizards from all houses and earn prestigious badges!
          </p>
        </div>
        <Link href="/dashboard/mock-tests" className="self-start">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium text-sm sm:text-base w-full sm:w-auto">
            Take Mock Tests
          </Button>
        </Link>
      </div>

      {/* User Card */}
      <Card className="border-2 border-amber-800/30 bg-amber-50/80 overflow-hidden relative mb-8">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="text-xl text-amber-800 font-serif">Your Magical Standing</CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 mb-4">
            <div className="flex items-center">
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full ${getHouseColorClass(house)} flex items-center justify-center mr-3 font-bold text-sm sm:text-base`}>
                {username?.[0]?.toUpperCase() || 'W'}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium text-amber-900">{username || 'Wizard'}</h3>
                <p className="text-sm text-amber-700 capitalize">{house} House</p>
              </div>
            </div>
            {userRank && (
              <div className="ml-0 sm:ml-auto self-start sm:self-auto">
                <Badge className={`${getHouseBadgeClass(house)} border px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium`}>
                  Rank #{userRank}
                </Badge>
              </div>
            )}
          </div>

          {userTestResults.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
              <div className="bg-amber-100 rounded-lg p-2 sm:p-4 border border-amber-300 text-center">
                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600 mx-auto mb-1" />
                <p className="text-xs sm:text-sm font-medium text-amber-800">Total Score</p>
                <p className="text-lg sm:text-2xl font-bold text-amber-900">
                  {userTestResults.reduce((sum, result) => sum + result.score, 0)}
                </p>
              </div>

              <div className="bg-green-100 rounded-lg p-2 sm:p-4 border border-green-300 text-center">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs sm:text-sm font-medium text-green-800">Tests Passed</p>
                <p className="text-lg sm:text-2xl font-bold text-green-700">
                  {userTestResults.filter(result => result.passed).length}
                </p>
              </div>

              <div className="bg-blue-100 rounded-lg p-2 sm:p-4 border border-blue-300 text-center">
                <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs sm:text-sm font-medium text-blue-800">Tests Taken</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-700">
                  {userTestResults.length}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-100 rounded-lg p-3 sm:p-4 border border-amber-300 text-center mt-4">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mx-auto mb-2" />
              <h3 className="text-base sm:text-lg font-medium text-amber-800 mb-2">No Tests Completed Yet</h3>
              <p className="text-sm sm:text-base text-amber-700">
                Take your first mock test to see your performance and earn points for your house!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="leaderboard" className="mb-8">
        <TabsList className="mb-4 w-full grid grid-cols-3 h-auto">
          <TabsTrigger value="leaderboard" className="text-xs sm:text-sm py-1.5 sm:py-2">Wizard Leaderboard</TabsTrigger>
          <TabsTrigger value="houses" className="text-xs sm:text-sm py-1.5 sm:py-2">House Cup</TabsTrigger>
          <TabsTrigger value="recent" className="text-xs sm:text-sm py-1.5 sm:py-2">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <Card className="border-2 border-amber-800/30 bg-amber-50/80 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-xl text-amber-800 font-serif">Top Wizards</CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              {leaderboardData.length > 0 ? (
                <div className="space-y-4">
                  {leaderboardData.slice(0, 10).map((user) => {
                    const isCurrentUser = user.user_id === userId;

                    return (
                      <div
                        key={user.user_id}
                        className={`${
                          isCurrentUser ? 'bg-amber-100 border-amber-300' : 'bg-white border-gray-200'
                        } rounded-lg p-3 sm:p-4 border`}
                      >
                        <div className="flex flex-wrap items-center">
                          <div className="flex items-center justify-center w-6 sm:w-8 mr-2 sm:mr-3">
                            {getRankMedal(user.rank)}
                          </div>

                          <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full ${getHouseColorClass(user.house)} flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-bold`}>
                            {user.username?.[0]?.toUpperCase() || 'W'}
                          </div>

                          <div className="flex-grow min-w-0">
                            <div className="flex flex-wrap items-center gap-1">
                              <h3 className={`font-medium text-sm sm:text-base truncate ${isCurrentUser ? 'text-amber-900' : 'text-gray-800'}`}>
                                {user.username}
                                {isCurrentUser && <span className="ml-1 text-xs text-amber-600">(You)</span>}
                              </h3>
                              <Badge className={`${getHouseBadgeClass(user.house)} text-xs px-1.5 py-0.5`}>
                                {user.house}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap text-xs text-gray-500 mt-1 gap-2">
                              <span>Tests: {user.tests_taken}</span>
                              <span>Passed: {user.tests_passed}</span>
                              <span>Best: {user.best_score}</span>
                            </div>
                          </div>

                          <div className="text-right ml-2">
                            <span className={`font-bold text-base sm:text-lg ${isCurrentUser ? 'text-amber-900' : 'text-gray-800'}`}>
                              {user.total_score}
                            </span>
                            <p className="text-xs text-gray-500">points</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                  <h3 className="text-xl font-medium text-amber-800 mb-2">Be the First on the Leaderboard!</h3>
                  <p className="text-amber-700 mb-4">
                    No wizards have completed any tests yet. Take a test to claim the top spot!
                  </p>
                  <Link href="/dashboard/mock-tests">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
                      Take a Test
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="houses">
          <Card className="border-2 border-amber-800/30 bg-amber-50/80 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-xl text-amber-800 font-serif">House Cup Competition</CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-4">
                {houseStats.map((houseData, index) => {
                  const isUserHouse = house === houseData.house;

                  return (
                    <div
                      key={houseData.house}
                      className={`${
                        isUserHouse ? 'bg-amber-100 border-amber-300' : 'bg-white border-gray-200'
                      } rounded-lg p-3 sm:p-4 border`}
                    >
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="flex items-center">
                          {index === 0 && <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-2" />}
                          <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full ${getHouseColorClass(houseData.house)} flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-bold`}>
                            {houseData.house[0].toUpperCase()}
                          </div>
                          <div>
                            <h3 className={`font-medium text-sm sm:text-base capitalize ${isUserHouse ? 'text-amber-900' : 'text-gray-800'}`}>
                              {houseData.house} House
                              {isUserHouse && <span className="ml-1 text-xs text-amber-600">(Your House)</span>}
                            </h3>
                            <div className="flex flex-wrap text-xs text-gray-500 mt-1 gap-2">
                              <span>Members: {houseData.members}</span>
                              <span>Tests Passed: {houseData.tests_passed}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <span className={`font-bold text-base sm:text-lg ${isUserHouse ? 'text-amber-900' : 'text-gray-800'}`}>
                            {houseData.total_points}
                          </span>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card className="border-2 border-amber-800/30 bg-amber-50/80 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/parchment-texture.jpg')] opacity-20 pointer-events-none"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-xl text-amber-800 font-serif">Recent Activity</CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              {recentResults.length > 0 ? (
                <div className="space-y-4">
                  {recentResults.map((result: any) => {
                    const isCurrentUser = result.user_id === userId;
                    const username = result.users?.username || 'Unknown Wizard';
                    const userHouse = result.users?.house || 'gryffindor';

                    return (
                      <div
                        key={result.id}
                        className={`${
                          isCurrentUser ? 'bg-amber-100 border-amber-300' : 'bg-white border-gray-200'
                        } rounded-lg p-3 sm:p-4 border`}
                      >
                        <div className="flex flex-wrap items-center">
                          <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full ${getHouseColorClass(userHouse)} flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-bold`}>
                            {username[0]?.toUpperCase() || 'W'}
                          </div>

                          <div className="flex-grow min-w-0">
                            <div className="flex flex-wrap items-center gap-1">
                              <h3 className={`font-medium text-sm sm:text-base truncate ${isCurrentUser ? 'text-amber-900' : 'text-gray-800'}`}>
                                {username}
                                {isCurrentUser && <span className="ml-1 text-xs text-amber-600">(You)</span>}
                              </h3>
                              <Badge className={`${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs px-1.5 py-0.5`}>
                                {result.passed ? 'Passed' : 'Failed'}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {result.test_id.replace('/', ' ')} • {new Date(result.created_at).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="text-right ml-2">
                            <span className={`font-bold text-sm sm:text-base ${isCurrentUser ? 'text-amber-900' : 'text-gray-800'}`}>
                              {result.score}/{result.total_marks}
                            </span>
                            <p className="text-xs text-gray-500">
                              {formatTime(result.time_taken)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                  <h3 className="text-xl font-medium text-amber-800 mb-2">No Recent Activity</h3>
                  <p className="text-amber-700 mb-4">
                    Be the first to complete a test and appear in the activity feed!
                  </p>
                  <Link href="/dashboard/mock-tests">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium">
                      Take a Test
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="text-center py-6 sm:py-8 bg-amber-100 rounded-lg border-2 border-amber-300 px-3 sm:px-6">
        <Trophy className="h-8 w-8 sm:h-12 sm:w-12 text-amber-600 mx-auto mb-2" />
        <h3 className="text-lg sm:text-xl font-medium text-amber-800 mb-2">Improve Your Magical Ranking!</h3>
        <p className="text-sm sm:text-base text-amber-700 mb-4 sm:mb-6 max-w-2xl mx-auto">
          Complete more mock tests to earn points for your house and climb the leaderboard.
          The more tests you pass, the higher your rank will be!
        </p>
        <Link href="/dashboard/mock-tests">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-800 font-medium px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base w-full sm:w-auto">
            Take Another Mock Test
          </Button>
        </Link>
      </div>
    </div>
  )
}
