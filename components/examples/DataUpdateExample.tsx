'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

interface User {
  id: string
  name: string
  email: string
  totalHours: number
  level: string
}

export default function DataUpdateExample() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    totalHours: 0
  })

  // Example: Update user data
  const updateUser = async (userId: string, data: Partial<User>) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      toast.success('User updated successfully!')
    } catch (error) {
      toast.error('Failed to update user')
      console.error('Error updating user:', error)
    } finally {
      setLoading(false)
    }
  }

  // Example: Update drive status
  const updateDriveStatus = async (driveId: string, status: string) => {
    try {
      const response = await fetch(`/api/drives/${driveId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update drive')
      }

      toast.success('Drive status updated!')
    } catch (error) {
      toast.error('Failed to update drive')
      console.error('Error updating drive:', error)
    }
  }

  // Example: Bulk update using Prisma directly
  const bulkUpdateVolunteerLevels = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/bulk-update-levels', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to update levels')
      }

      toast.success('Volunteer levels updated!')
    } catch (error) {
      toast.error('Failed to update levels')
      console.error('Error updating levels:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Update User Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hours">Total Hours</Label>
            <Input
              id="hours"
              type="number"
              value={formData.totalHours}
              onChange={(e) => setFormData({ ...formData, totalHours: Number(e.target.value) })}
              placeholder="Enter total hours"
            />
          </div>
          <Button 
            onClick={() => user && updateUser(user.id, formData)}
            disabled={loading || !user}
          >
            {loading ? 'Updating...' : 'Update User'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={bulkUpdateVolunteerLevels}
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Updating...' : 'Update All Volunteer Levels'}
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => updateDriveStatus('drive-id-here', 'ONGOING')}
              variant="outline"
              size="sm"
            >
              Mark Drive as Ongoing
            </Button>
            <Button 
              onClick={() => updateDriveStatus('drive-id-here', 'COMPLETED')}
              variant="outline"
              size="sm"
            >
              Mark Drive as Completed
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
