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
  Users,
  TrendingUp,
  Star,
  Plus,
  Eye,
  Edit,
  BarChart3,
  FileText,
  DollarSign,
  Award,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock NGO data
  const ngo = {
    name: 'Teach for India',
    cause: 'Education',
    rating: 4.8,
    totalVolunteers: 1234,
    activeDrives: 5,
    completedDrives: 45,
    totalHours: 8456,
    beneficiariesImpacted: 2340,
    profileCompleteness: 85,
    transparencyScore: 92,
    verificationStatus: 'verified'
  }

  const activeDrives = [
    {
      id: '1',
      title: 'Digital Literacy Training',
      date: '2024-02-15',
      location: 'Online',
      volunteers: 12,
      capacity: 20,
      status: 'published',
      registrations: 12,
      type: 'virtual'
    },
    {
      id: '2', 
      title: 'School Library Setup',
      date: '2024-02-18',
      location: 'Malad School, Mumbai',
      volunteers: 8,
      capacity: 15,
      status: 'published',
      registrations: 8,
      type: 'onground'
    },
    {
      id: '3',
      title: 'Career Guidance Session',
      date: '2024-02-20',
      location: 'Andheri Community Center',
      volunteers: 0,
      capacity: 25,
      status: 'draft',
      registrations: 0,
      type: 'onground'
    }
  ]

  const recentVolunteers = [
    {
      name: 'Priya Sharma',
      level: 'Gold',
      rating: 4.9,
      hours: 156,
      lastActivity: '2024-02-10',
      status: 'active'
    },
    {
      name: 'Rahul Kumar', 
      level: 'Silver',
      rating: 4.7,
      hours: 89,
      lastActivity: '2024-02-08',
      status: 'active'
    },
    {
      name: 'Anjali Patel',
      level: 'Gold',
      rating: 4.8,
      hours: 134,
      lastActivity: '2024-02-05',
      status: 'active'
    }
  ]

  const impactMetrics = [
    { label: 'Children Taught', value: '1,234', change: '+15%', icon: Users },
    { label: 'Books Distributed', value: '2,845', change: '+23%', icon: FileText },
    { label: 'Schools Reached', value: '45', change: '+8%', icon: MapPin },
    { label: 'Digital Devices Setup', value: '156', change: '+12%', icon: TrendingUp }
  ]

  const pendingTasks = [
    { task: 'Review volunteer applications', count: 8, urgent: true },
    { task: 'Upload drive outcomes', count: 3, urgent: false },
    { task: 'Respond to volunteer reviews', count: 5, urgent: false },
    { task: 'Update NGO profile', count: 1, urgent: true }
  ]

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your drives and track your impact</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/ngo/drives/create">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Drive
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Completion Alert */}
        {ngo.profileCompleteness < 90 && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Complete your profile to attract more volunteers</p>
                  <p className="text-sm text-yellow-600">Your profile is {ngo.profileCompleteness}% complete</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Complete Profile
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ngo.totalVolunteers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {ngo.activeDrives} active drives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NGO Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {ngo.rating}
                <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
              </div>
              <p className="text-xs text-muted-foreground">
                From {ngo.completedDrives} completed drives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volunteer Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ngo.totalHours.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total contributed hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ngo.beneficiariesImpacted.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Beneficiaries reached
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="drives">My Drives</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="applications">CSR Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Drives */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Active Drives</span>
                    </span>
                    <Link href="/ngo/drives">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeDrives.slice(0, 3).map((drive) => (
                    <div key={drive.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{drive.title}</h4>
                          <Badge className={statusColors[drive.status as keyof typeof statusColors]}>
                            {drive.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{new Date(drive.date).toLocaleDateString()}</span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {drive.location}
                          </span>
                          <span>{drive.volunteers}/{drive.capacity} volunteers</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pending Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Pending Tasks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingTasks.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${item.urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
                        <span className="font-medium">{item.task}</span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                      <Button size="sm" variant={item.urgent ? 'default' : 'outline'}>
                        Action
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Top Volunteers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Top Volunteers</span>
                  </span>
                  <Link href="/ngo/volunteers">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVolunteers.map((volunteer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{volunteer.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Badge variant="outline">{volunteer.level}</Badge>
                            <span>•</span>
                            <span>{volunteer.hours} hours</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                              <span>{volunteer.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Last active</p>
                        <p className="text-sm">{new Date(volunteer.lastActivity).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Impact Metrics</span>
                </CardTitle>
                <CardDescription>
                  Track your organization's measurable outcomes and impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {impactMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <metric.icon className="h-5 w-5 text-blue-600" />
                        <Badge variant="secondary" className="text-green-600">
                          {metric.change}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}