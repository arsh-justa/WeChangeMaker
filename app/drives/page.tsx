'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Clock,
  Search,
  Filter,
  Grid,
  List,
  Heart,
  Star,
  CheckCircle
} from 'lucide-react'
import { format } from 'date-fns'

export default function DrivesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCause, setSelectedCause] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const causes = [
    'Environment',
    'Education', 
    'Health',
    'Child Welfare',
    'Women Empowerment',
    'Senior Citizens',
    'Animal Welfare',
    'Disaster Relief'
  ]

  const cities = [
    'Mumbai',
    'Delhi', 
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad'
  ]

  const mockDrives = [
    {
      id: '1',
      title: 'Beach Cleanup Drive - Save Our Oceans',
      description: 'Join us for a community beach cleanup to protect marine life and keep our beaches pristine.',
      ngo: {
        name: 'Ocean Warriors',
        image: 'https://images.pexels.com/photos/4021602/pexels-photo-4021602.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        rating: 4.8,
        verified: true
      },
      cause: 'Environment',
      location: 'Juhu Beach, Mumbai',
      date: '2024-02-15',
      time: '07:00 - 10:00',
      volunteers: 45,
      capacity: 60,
      skills: ['No special skills required'],
      type: 'On-ground',
      urgent: false
    },
    {
      id: '2', 
      title: 'Teaching Session at Government School',
      description: 'Help underprivileged children with basic math and English skills. Make education accessible for all.',
      ngo: {
        name: 'Shiksha Foundation',
        image: 'https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        rating: 4.9,
        verified: true
      },
      cause: 'Education',
      location: 'Malad Government School, Mumbai',
      date: '2024-02-16',
      time: '14:00 - 17:00',
      volunteers: 12,
      capacity: 15,
      skills: ['Basic English', 'Math'],
      type: 'On-ground',
      urgent: true
    },
    {
      id: '3',
      title: 'Food Distribution for Underprivileged',
      description: 'Help distribute nutritious meals to homeless individuals and families in need.',
      ngo: {
        name: 'Feeding Hearts',
        image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        rating: 4.7,
        verified: true
      },
      cause: 'Hunger Relief',
      location: 'Dharavi Community Center, Mumbai',
      date: '2024-02-17',
      time: '12:00 - 15:00',
      volunteers: 28,
      capacity: 30,
      skills: ['Food handling knowledge preferred'],
      type: 'On-ground',
      urgent: false
    },
    {
      id: '4',
      title: 'Virtual Mentoring for Rural Students',
      description: 'Mentor rural students online in career guidance and skill development.',
      ngo: {
        name: 'Rural Connect',
        image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        rating: 4.6,
        verified: true
      },
      cause: 'Education',
      location: 'Online (Pan India)',
      date: '2024-02-18',
      time: '16:00 - 18:00',
      volunteers: 8,
      capacity: 20,
      skills: ['Professional experience', 'Good communication'],
      type: 'Virtual',
      urgent: false
    },
    {
      id: '5',
      title: 'Tree Plantation Drive',
      description: 'Plant native trees to combat climate change and create green spaces in urban areas.',
      ngo: {
        name: 'Green Delhi',
        image: 'https://images.pexels.com/photos/5211912/pexels-photo-5211912.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        rating: 4.5,
        verified: true
      },
      cause: 'Environment', 
      location: 'Central Park, Delhi',
      date: '2024-02-19',
      time: '08:00 - 12:00',
      volunteers: 67,
      capacity: 80,
      skills: ['Physical fitness'],
      type: 'On-ground',
      urgent: false
    },
    {
      id: '6',
      title: 'Senior Citizens Companionship',
      description: 'Spend quality time with elderly residents, play games, and provide emotional support.',
      ngo: {
        name: 'Golden Years',
        image: 'https://images.pexels.com/photos/5999821/pexels-photo-5999821.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        rating: 4.8,
        verified: true
      },
      cause: 'Senior Citizens',
      location: 'Sunshine Old Age Home, Bangalore',
      date: '2024-02-20',
      time: '10:00 - 14:00',
      volunteers: 15,
      capacity: 25,
      skills: ['Patience', 'Good listening skills'],
      type: 'On-ground',
      urgent: true
    }
  ]

  const causeColors = {
    'Environment': 'bg-green-100 text-green-800',
    'Education': 'bg-blue-100 text-blue-800',
    'Health': 'bg-red-100 text-red-800',
    'Hunger Relief': 'bg-orange-100 text-orange-800',
    'Child Welfare': 'bg-purple-100 text-purple-800',
    'Women Empowerment': 'bg-pink-100 text-pink-800',
    'Senior Citizens': 'bg-indigo-100 text-indigo-800',
    'Animal Welfare': 'bg-yellow-100 text-yellow-800',
    'Disaster Relief': 'bg-gray-100 text-gray-800'
  }

  const filteredDrives = mockDrives.filter(drive => {
    const matchesSearch = drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         drive.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         drive.ngo.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCause = !selectedCause || drive.cause === selectedCause
    const matchesCity = !selectedCity || drive.location.includes(selectedCity)
    const matchesDate = !selectedDate || drive.date === format(selectedDate, 'yyyy-MM-dd')

    return matchesSearch && matchesCause && matchesCity && matchesDate
  })

  const DriveCard = ({ drive, isListView = false }: { drive: any, isListView?: boolean }) => (
    <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${isListView ? 'flex flex-row' : ''}`}>
      <div className={isListView ? 'flex-1' : ''}>
        <CardHeader className={isListView ? 'pb-4' : ''}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Badge className={causeColors[drive.cause as keyof typeof causeColors]}>
                {drive.cause}
              </Badge>
              {drive.urgent && (
                <Badge variant="destructive">
                  Urgent
                </Badge>
              )}
              <Badge variant="outline">
                {drive.type}
              </Badge>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>{format(new Date(drive.date), 'MMM dd')}</div>
              <div>{drive.time}</div>
            </div>
          </div>
          
          <CardTitle className={`leading-tight ${isListView ? 'text-lg' : 'text-xl'}`}>
            {drive.title}
          </CardTitle>
          
          <div className="flex items-center space-x-3 mt-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={drive.ngo.image} alt={drive.ngo.name} />
              <AvatarFallback>{drive.ngo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{drive.ngo.name}</span>
              {drive.ngo.verified && <CheckCircle className="h-4 w-4 text-blue-600" />}
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{drive.ngo.rating}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="mb-4">
            {drive.description}
          </CardDescription>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{drive.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{drive.volunteers}/{drive.capacity} joined</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>Skills: {drive.skills.join(', ')}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link href={`/drives/${drive.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Button size="sm">
                  Register
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Volunteering Opportunities
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Find meaningful ways to give back to your community. Every hour counts, every action matters.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search drives, NGOs, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCause} onValueChange={setSelectedCause}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select cause" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All causes</SelectItem>
                  {causes.map(cause => (
                    <SelectItem key={cause} value={cause}>{cause}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-48">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              {filteredDrives.length} drives found
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Drives Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredDrives.map((drive) => (
            <DriveCard 
              key={drive.id} 
              drive={drive} 
              isListView={viewMode === 'list'} 
            />
          ))}
        </div>

        {filteredDrives.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No drives found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or browse all available drives.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCause('')
                  setSelectedCity('')
                  setSelectedDate(undefined)
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}