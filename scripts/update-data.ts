#!/usr/bin/env tsx

import { prisma } from '../lib/prisma'

async function updateUserData() {
  console.log('🔄 Starting user data updates...')
  
  try {
    // Example: Update all volunteer levels based on hours
    const volunteers = await prisma.user.findMany({
      where: { role: 'VOLUNTEER' }
    })

    for (const volunteer of volunteers) {
      let newLevel = 'BRONZE'
      
      if (volunteer.totalHours >= 100) {
        newLevel = 'PLATINUM'
      } else if (volunteer.totalHours >= 50) {
        newLevel = 'GOLD'
      } else if (volunteer.totalHours >= 10) {
        newLevel = 'SILVER'
      }

      if (volunteer.level !== newLevel) {
        await prisma.user.update({
          where: { id: volunteer.id },
          data: { level: newLevel as any }
        })
        console.log(`✅ Updated ${volunteer.name} to ${newLevel} level`)
      }
    }

    console.log('✅ User level updates completed!')
  } catch (error) {
    console.error('❌ Error updating user data:', error)
  }
}

async function updateDriveStatuses() {
  console.log('🔄 Updating drive statuses...')
  
  try {
    const now = new Date()
    
    // Update ongoing drives
    await prisma.drive.updateMany({
      where: {
        status: 'PUBLISHED',
        startAt: { lte: now },
        endAt: { gte: now }
      },
      data: { status: 'ONGOING' }
    })

    // Update completed drives
    await prisma.drive.updateMany({
      where: {
        status: { in: ['PUBLISHED', 'ONGOING'] },
        endAt: { lt: now }
      },
      data: { status: 'COMPLETED' }
    })

    console.log('✅ Drive status updates completed!')
  } catch (error) {
    console.error('❌ Error updating drive statuses:', error)
  }
}

async function updateNGOScores() {
  console.log('🔄 Updating NGO allocation scores...')
  
  try {
    const ngos = await prisma.nGOProfile.findMany({
      include: {
        drives: {
          include: {
            reviews: true,
            registrations: true
          }
        },
        reviews: true
      }
    })

    for (const ngo of ngos) {
      // Calculate average rating
      const avgRating = ngo.reviews.length > 0 
        ? ngo.reviews.reduce((sum, review) => sum + review.coordinationRating, 0) / ngo.reviews.length
        : 0

      // Calculate volunteer engagement
      const totalRegistrations = ngo.drives.reduce((sum, drive) => sum + (drive.registrations?.length || 0), 0)
      const engagementScore = Math.min(100, (totalRegistrations / Math.max(ngo.drives.length, 1)) * 10)

      // Update allocation score
      const existingScore = await prisma.allocationScore.findFirst({
        where: { ngoId: ngo.id }
      })

      if (existingScore) {
        await prisma.allocationScore.update({
          where: { id: existingScore.id },
          data: {
            avgRatingScore: avgRating * 20, // Convert to 0-100 scale
            volunteerEngagementScore: engagementScore,
            compositeScore: (avgRating * 20 + engagementScore) / 2
          }
        })
      } else {
        await prisma.allocationScore.create({
          data: {
            ngoId: ngo.id,
            avgRatingScore: avgRating * 20,
            volunteerEngagementScore: engagementScore,
            compositeScore: (avgRating * 20 + engagementScore) / 2
          }
        })
      }
    }

    console.log('✅ NGO score updates completed!')
  } catch (error) {
    console.error('❌ Error updating NGO scores:', error)
  }
}

async function main() {
  console.log('🚀 Starting database updates...')
  
  await updateUserData()
  await updateDriveStatuses()
  await updateNGOScores()
  
  console.log('🎉 All database updates completed!')
  await prisma.$disconnect()
}

main().catch(console.error)
