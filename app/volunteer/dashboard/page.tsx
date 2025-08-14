'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar,
  Clock,
  MapPin,
  Award,
  Users,
  TrendingUp,
  Heart,
  Star,
  CheckCircle,
  Plus,
  Download,
  Share,
  QrCode,
  Bell
} from 'lucide-react'

export default function VolunteerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data
  const volunteer = {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    level: 'Gold',
    totalHours: 156,
    points: 3420,
    avgRating: 4.8,
    joinedDate: '2023-06-15',
    nextLevelHours: 200,
    badges: 8,
    referrals: 3,
    completedDrives: 23
  }

  const upcomingDrives = [
    {
      id: '1',
      title: 'Beach Cleanup Drive',
      ngo: 'Ocean Warriors',
      date: '2024-02-15',
      time: '07:00 - 10:00',
      location: 'Juhu Beach, Mumbai',
      status: 'registered',
      qrEnabled: true
    },
    {
      id: '2',
      title: 'Teaching Session',
      ngo: 'Shiksha Foundation',
      date: '2024-02-18',
      time: '14:00 - 17:00',
      location: 'Malad School, Mumbai',
      status: 'registered',
      qrEnabled: false
    }
  ]

  const recentActivity = [
    {
      type: 'completed',
      title: 'Food Distribution Drive',
      ngo: 'Feeding Hearts',
      date: '2024-02-10',
      hours: 4,
      rating: 5,
      certificateAvailable: true
    },
    {
      type: 'badge_earned',
      title: 'Community Champion Badge',
      date: '2024-02-08',
      description: 'Earned for completing 20+ drives'
    },
    {
      type: 'completed',
      title: 'Tree Plantation',
      ngo: 'Green Mumbai',
      date: '2024-02-05',
      hours: 3,
      rating: 4,
      certificateAvailable: true
    }
  ]

  const badges = [
    { name: 'Early Bird', icon: '🌅', earned: true, description: 'Joined drives before 8 AM' },
    { name: 'Educator', icon: '📚', earned: true, description: 'Completed 5+ education drives' },
    { name: 'Green Warrior', icon: '🌱', earned: true, description: 'Participated in environment drives' },
    { name: 'Community Champion', icon: '🏆', earned: true, description: 'Completed 20+ drives' },
    { name: 'Mentor', icon: '👨‍🏫', earned: false, description: 'Refer 5 friends who complete drives' },
    { name: 'Platinum Volunteer', icon: '💎', earned: false, description: 'Reach 500 volunteer hours' },
  ]

  const recommendations = [
    {
      id: '1',
      title: 'Digital Literacy Training',
      ngo: 'Tech for Good',
      cause: 'Education',
      date: '2024-02-20',
      location: 'Online',
      match: 95,
      reason: 'Based on your teaching experience'
    },
    {
      id: '2',
      title: 'Senior Citizens Health Camp',
      ngo: 'Care Connect',
      cause: 'Health',
      date: '2024-02-22',
      location: 'Andheri, Mumbai',
      match: 87,
      reason: 'Close to your location'
    }
  ]

  const levelColors = {
    Bronze: 'bg-orange-100 text-orange-800',
    Silver: 'bg-gray-100 text-gray-800', 
    Gold: 'bg-yellow-100 text-yellow-800',
    Platinum: 'bg-purple-100 text-purple-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {volunteer.name}!</h1>
              <p className="text-gray-600 mt-1">Ready to make a difference today?</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Link href="/drives">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Find New Drives
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{volunteer.totalHours}</div>
              <p className="text-xs text-muted-foreground">
                {volunteer.nextLevelHours - volunteer.totalHours} hours to Platinum
              </p>
              <Progress 
                value={(volunteer.totalHours / volunteer.nextLevelHours) * 100} 
                className="mt-2" 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volunteer Level</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={levelColors[volunteer.level as keyof typeof levelColors]}>
                  {volunteer.level}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {volunteer.points} points earned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {volunteer.avgRating}
                <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
              </div>
              <p className="text-xs text-muted-foreground">
                From {volunteer.completedDrives} completed drives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{volunteer.badges}</div>
              <p className="text-xs text-muted-foreground">
                {volunteer.referrals} successful referrals
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="drives">My Drives</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Drives */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Drives</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingDrives.map((drive) => (
                    <div key={drive.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{drive.title}</h4>
                        <p className="text-sm text-gray-600">by {drive.ngo}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{new Date(drive.date).toLocaleDateString()}</span>
                          <span>{drive.time}</span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {drive.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {drive.qrEnabled && (
                          <Button size="sm" variant="outline">
                            <QrCode className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                  
                  <Link href="/volunteer/calendar">
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Calendar
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Personalized Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Recommended for You</span>
                  </CardTitle>
                  <CardDescription>
                    Based on your interests and location
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{rec.title}</h4>
                          <p className="text-sm text-gray-600">by {rec.ngo}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <Badge variant="outline">{rec.cause}</Badge>
                            <span>{new Date(rec.date).toLocaleDateString()}</span>
                            <span>{rec.location}</span>
                          </div>
                          <p className="text-xs text-blue-600 mt-1">{rec.reason}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{rec.match}% match</div>
                          <Button size="sm" className="mt-2">Register</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        ) : activity.type === 'badge_earned' ? (
                          <Award className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <Users className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        {activity.ngo && (
                          <p className="text-sm text-gray-600">with {activity.ngo}</p>
                        )}
                        {activity.description && (
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        )}
                        <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        {activity.hours && (
                          <div className="text-sm font-medium">{activity.hours} hours</div>
                        )}
                        {activity.rating && (
                          <div className="flex items-center">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        )}
                        {activity.certificateAvailable && (
                          <Button size="sm" variant="outline" className="mt-1">
                            <Download className="h-3 w-3 mr-1" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>
                  Collect badges by completing different types of volunteer activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border text-center transition-all ${
                        badge.earned
                          ? 'bg-white border-yellow-200 shadow-sm'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h4 className={`font-medium ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {badge.name}
                      </h4>
                      <p className={`text-xs mt-1 ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {badge.description}
                      </p>
                      {badge.earned && (
                        <Badge variant="default" className="mt-2 bg-yellow-500">
                          Earned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs content would go here */}
        </Tabs>
      </div>
    </div>
  )
}