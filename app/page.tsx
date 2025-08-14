'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Heart, 
  Users, 
  Clock, 
  Target, 
  Award, 
  TrendingUp,
  MapPin,
  Calendar,
  ArrowRight,
  Star,
  CheckCircle,
  Globe
} from 'lucide-react'

export default function HomePage() {
  const stats = [
    { label: 'Volunteer Hours', value: '125,847', icon: Clock, change: '+12%' },
    { label: 'Lives Impacted', value: '89,234', icon: Heart, change: '+18%' },
    { label: 'Active NGOs', value: '456', icon: Users, change: '+8%' },
    { label: 'Cities Covered', value: '23', icon: Globe, change: '+2%' },
  ]

  const topNGOs = [
    { 
      name: 'Teach for India', 
      cause: 'Education', 
      rating: 4.8, 
      volunteers: 1234,
      image: 'https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      verified: true
    },
    { 
      name: 'Goonj', 
      cause: 'Disaster Relief', 
      rating: 4.9, 
      volunteers: 892,
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      verified: true
    },
    { 
      name: 'Akshaya Patra', 
      cause: 'Nutrition', 
      rating: 4.7, 
      volunteers: 756,
      image: 'https://images.pexels.com/photos/8613316/pexels-photo-8613316.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      verified: true
    },
  ]

  const topVolunteers = [
    { name: 'Priya Sharma', hours: 342, level: 'Platinum', city: 'Mumbai', badges: 12 },
    { name: 'Rahul Kumar', hours: 298, level: 'Gold', city: 'Delhi', badges: 8 },
    { name: 'Anjali Patel', hours: 267, level: 'Gold', city: 'Bangalore', badges: 9 },
  ]

  const upcomingDrives = [
    {
      id: '1',
      title: 'Beach Cleanup Drive',
      ngo: 'Ocean Warriors',
      date: '2024-02-15',
      location: 'Juhu Beach, Mumbai',
      volunteers: 45,
      capacity: 60,
      cause: 'Environment'
    },
    {
      id: '2', 
      title: 'Teaching Session at Govt School',
      ngo: 'Shiksha Foundation',
      date: '2024-02-16',
      location: 'Malad, Mumbai',
      volunteers: 12,
      capacity: 15,
      cause: 'Education'
    },
    {
      id: '3',
      title: 'Food Distribution Drive',
      ngo: 'Feeding Hearts',
      date: '2024-02-17',
      location: 'Dharavi, Mumbai',
      volunteers: 28,
      capacity: 30,
      cause: 'Hunger Relief'
    }
  ]

  const causeColors = {
    Environment: 'bg-green-100 text-green-800',
    Education: 'bg-blue-100 text-blue-800',
    'Hunger Relief': 'bg-orange-100 text-orange-800',
    Health: 'bg-red-100 text-red-800',
    'Disaster Relief': 'bg-purple-100 text-purple-800',
    Nutrition: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn every hour into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                impact
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover drives, track your contribution, and get recognized. Join thousands of volunteers 
              making a real difference in communities across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/drives">
                <Button size="lg" className="text-lg px-8 py-4">
                  Find Drives Near You
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Impact, Real Numbers</h2>
            <p className="text-gray-600">Live updates from our community of change makers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{stat.label}</p>
                  <Badge variant="secondary" className="text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change} this month
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top NGOs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured NGOs</h2>
              <p className="text-gray-600">Trusted organizations making the biggest impact</p>
            </div>
            <Link href="/ngos">
              <Button variant="outline">
                View All NGOs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topNGOs.map((ngo, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={ngo.image} alt={ngo.name} />
                      <AvatarFallback>{ngo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{ngo.name}</CardTitle>
                        {ngo.verified && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <Badge className={causeColors[ngo.cause as keyof typeof causeColors]}>
                        {ngo.cause}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{ngo.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{ngo.volunteers} volunteers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Drives */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Drives</h2>
              <p className="text-gray-600">Join these amazing volunteering opportunities</p>
            </div>
            <Link href="/drives">
              <Button variant="outline">
                View All Drives
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingDrives.map((drive) => (
              <Card key={drive.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge className={causeColors[drive.cause as keyof typeof causeColors]}>
                      {drive.cause}
                    </Badge>
                    <div className="text-right text-sm text-gray-500">
                      {new Date(drive.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{drive.title}</CardTitle>
                  <CardDescription className="text-gray-600">by {drive.ngo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{drive.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{drive.volunteers}/{drive.capacity} joined</span>
                      </div>
                      <Button size="sm">
                        Register
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Volunteers Leaderboard */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Volunteers</h2>
              <p className="text-gray-600">Celebrating our community champions</p>
            </div>
            <Link href="/leaderboard">
              <Button variant="outline">
                View Leaderboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topVolunteers.map((volunteer, index) => (
              <Card key={index} className="relative overflow-hidden">
                {index === 0 && (
                  <div className="absolute top-4 right-4">
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                )}
                <CardHeader className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="text-lg font-bold">
                      {volunteer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{volunteer.name}</CardTitle>
                  <CardDescription>{volunteer.city}</CardDescription>
                  <Badge 
                    variant={volunteer.level === 'Platinum' ? 'default' : 'secondary'}
                    className={volunteer.level === 'Platinum' ? 'bg-purple-600' : volunteer.level === 'Gold' ? 'bg-yellow-600' : ''}
                  >
                    {volunteer.level}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex justify-around text-sm">
                    <div>
                      <div className="font-bold text-lg">{volunteer.hours}</div>
                      <div className="text-gray-600">Hours</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{volunteer.badges}</div>
                      <div className="text-gray-600">Badges</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              * Rankings based on verified volunteer hours and community ratings
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of volunteers who are already creating positive change in their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup?role=volunteer">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Become a Volunteer
              </Button>
            </Link>
            <Link href="/auth/signup?role=ngo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
                Register Your NGO
              </Button>
            </Link>
            <Link href="/csr">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-purple-600">
                Partner for CSR
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}