import { PrismaClient, UserRole, CauseArea, DriveType, DriveStatus, RegistrationStatus, VolunteerLevel } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function seedDatabase() {
  console.log('Starting database seeding...')

  try {
    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10)

    // Super Admin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@wechangemakers.org',
        name: 'System Admin',
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        emailVerified: new Date(),
      }
    })

    // Sample Volunteers
    const volunteers = await Promise.all([
      prisma.user.create({
        data: {
          email: 'priya.sharma@example.com',
          name: 'Priya Sharma',
          password: hashedPassword,
          role: UserRole.VOLUNTEER,
          level: VolunteerLevel.GOLD,
          totalHours: 156,
          points: 3420,
          avgRating: 4.8,
          bio: 'Passionate about education and child welfare. Working professional looking to give back to community.',
          location: 'Mumbai, Maharashtra',
          interests: [CauseArea.CHILD_EDUCATION, CauseArea.WOMEN_EMPOWERMENT],
          emailVerified: new Date(),
        }
      }),
      prisma.user.create({
        data: {
          email: 'rahul.kumar@example.com', 
          name: 'Rahul Kumar',
          password: hashedPassword,
          role: UserRole.VOLUNTEER,
          level: VolunteerLevel.SILVER,
          totalHours: 89,
          points: 1890,
          avgRating: 4.6,
          bio: 'Software engineer interested in environmental causes and disaster relief.',
          location: 'Delhi, NCR',
          interests: [CauseArea.ENVIRONMENT, CauseArea.DISASTER_RELIEF],
          emailVerified: new Date(),
        }
      }),
      prisma.user.create({
        data: {
          email: 'anjali.patel@example.com',
          name: 'Anjali Patel', 
          password: hashedPassword,
          role: UserRole.VOLUNTEER,
          level: VolunteerLevel.GOLD,
          totalHours: 234,
          points: 4560,
          avgRating: 4.9,
          bio: 'Healthcare professional dedicated to senior citizen care and health awareness.',
          location: 'Bangalore, Karnataka',
          interests: [CauseArea.HEALTH, CauseArea.SENIOR_CITIZENS],
          emailVerified: new Date(),
        }
      })
    ])

    // Sample NGOs with profiles
    const ngoUsers = await Promise.all([
      prisma.user.create({
        data: {
          email: 'contact@teachforindia.org',
          name: 'Teach for India',
          password: hashedPassword,
          role: UserRole.NGO,
          emailVerified: new Date(),
          ngoProfile: {
            create: {
              organizationName: 'Teach for India',
              causes: [CauseArea.CHILD_EDUCATION],
              locations: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
              description: 'Working to eliminate educational inequity by building a movement of leaders who will ensure that all children receive an excellent education.',
              website: 'https://teachforindia.org',
              foundedYear: 2008,
              teamSize: 150,
              has12A: true,
              has80G: true,
              isCSREligible: true,
              profileCompletenessScore: 95,
              transparencyScore: 92,
            }
          }
        },
        include: { ngoProfile: true }
      }),
      prisma.user.create({
        data: {
          email: 'info@oceanwarriors.org',
          name: 'Ocean Warriors',
          password: hashedPassword, 
          role: UserRole.NGO,
          emailVerified: new Date(),
          ngoProfile: {
            create: {
              organizationName: 'Ocean Warriors',
              causes: [CauseArea.ENVIRONMENT],
              locations: ['Mumbai', 'Goa', 'Chennai'],
              description: 'Dedicated to marine conservation and protecting our oceans through community-driven cleanup drives.',
              website: 'https://oceanwarriors.org',
              foundedYear: 2015,
              teamSize: 45,
              has12A: true,
              has80G: true,
              isCSREligible: true,
              profileCompletenessScore: 88,
              transparencyScore: 90,
            }
          }
        },
        include: { ngoProfile: true }
      })
    ])

    // Sample CSR Partners
    const csrPartner = await prisma.user.create({
      data: {
        email: 'csr@techcorp.com',
        name: 'TechCorp India',
        password: hashedPassword,
        role: UserRole.CSR_PARTNER,
        emailVerified: new Date(),
        csrProfile: {
          create: {
            companyName: 'TechCorp India Ltd.',
            industry: 'Information Technology',
            focusCauses: [CauseArea.CHILD_EDUCATION, CauseArea.ENVIRONMENT],
            geographies: ['Mumbai', 'Bangalore', 'Hyderabad'],
            companySize: '1000-5000',
            website: 'https://techcorp.com',
            description: 'Leading IT company committed to social impact through education and environmental sustainability.',
          }
        }
      },
      include: { csrProfile: true }
    })

    // Sample Drives
    const drives = await Promise.all([
      prisma.drive.create({
        data: {
          ngoId: ngoUsers[0].ngoProfile!.id,
          title: 'Digital Literacy Training for Underprivileged Children',
          description: 'Help teach basic computer skills to children from low-income families. No prior teaching experience required - we provide training materials.',
          cause: CauseArea.CHILD_EDUCATION,
          type: DriveType.ONGROUND,
          location: 'Malad Community Center, Mumbai',
          address: 'Plot 123, Malad West, Mumbai 400064',
          startAt: new Date('2024-02-15T09:00:00Z'),
          endAt: new Date('2024-02-15T13:00:00Z'),
          capacity: 20,
          requiredSkills: ['Basic computer knowledge', 'Patience with children'],
          materialsNeeded: ['Notebooks', 'Laptops (provided)', 'Stationery'],
          status: DriveStatus.PUBLISHED,
          pocName: 'Meera Singh',
          pocEmail: 'meera@teachforindia.org',
          pocMobile: '+91 98765 43210',
          images: [
            'https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg',
            'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg'
          ],
          beneficiariesCount: 35,
          outcomesMetrics: {
            childrenTrained: 35,
            skillsLearnt: ['Basic typing', 'Internet browsing', 'Email'],
            certificatesIssued: 35
          },
          impactStory: '35 children from Malad slums learned basic computer skills, opening doors to digital opportunities.'
        }
      }),
      prisma.drive.create({
        data: {
          ngoId: ngoUsers[1].ngoProfile!.id,
          title: 'Beach Cleanup Drive - Save Our Oceans',
          description: 'Join our monthly beach cleanup drive to remove plastic waste and protect marine life. Families welcome!',
          cause: CauseArea.ENVIRONMENT,
          type: DriveType.ONGROUND,
          location: 'Juhu Beach, Mumbai',
          address: 'Juhu Beach, near Sunset Point, Mumbai 400049',
          startAt: new Date('2024-02-18T07:00:00Z'),
          endAt: new Date('2024-02-18T10:00:00Z'),
          capacity: 60,
          requiredSkills: ['Physical fitness', 'Enthusiasm for environment'],
          materialsNeeded: ['Gloves (provided)', 'Garbage bags (provided)', 'Water bottle'],
          status: DriveStatus.PUBLISHED,
          pocName: 'Arjun Mehta',
          pocEmail: 'arjun@oceanwarriors.org',
          pocMobile: '+91 87654 32109',
          images: [
            'https://images.pexels.com/photos/4021602/pexels-photo-4021602.jpeg',
            'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg'
          ],
          beneficiariesCount: 1,
          outcomesMetrics: {
            plasticCollected: '45kg',
            beachAreaCleaned: '2km',
            volunteersParticipated: 45
          },
          impactStory: 'Volunteers collected 45kg of plastic waste from 2km stretch of Juhu Beach, directly protecting marine ecosystem.'
        }
      })
    ])

    // Sample Registrations
    const registrations = await Promise.all([
      prisma.registration.create({
        data: {
          volunteerId: volunteers[0].id,
          driveId: drives[0].id,
          status: RegistrationStatus.COMPLETED,
          checkinTime: new Date('2024-02-15T09:00:00Z'),
          checkoutTime: new Date('2024-02-15T13:00:00Z'),
          verifiedHours: 4,
          qrCode: 'QR_' + Math.random().toString(36).substr(2, 9)
        }
      }),
      prisma.registration.create({
        data: {
          volunteerId: volunteers[1].id,
          driveId: drives[1].id,
          status: RegistrationStatus.REGISTERED,
          qrCode: 'QR_' + Math.random().toString(36).substr(2, 9)
        }
      })
    ])

    // Sample Reviews
    await prisma.review.create({
      data: {
        volunteerId: volunteers[0].id,
        ngoId: ngoUsers[0].ngoProfile!.id,
        driveId: drives[0].id,
        coordinationRating: 5,
        executionRating: 4,
        alignmentRating: 5,
        impactRating: 5,
        comment: 'Excellent organization! The training materials were well-prepared and the children were very engaged. Would love to participate again.',
        ngoResponse: 'Thank you Priya! Your patience and enthusiasm made a huge difference to the children. Looking forward to having you back!'
      }
    })

    // Sample Badges
    const badges = await Promise.all([
      prisma.badge.create({
        data: {
          name: 'Early Bird',
          description: 'Participated in drives starting before 8 AM',
          icon: 'sunrise',
          criteria: { timeSlot: 'morning', count: 3 }
        }
      }),
      prisma.badge.create({
        data: {
          name: 'Education Champion', 
          description: 'Completed 5+ education-related drives',
          icon: 'book',
          criteria: { cause: 'CHILD_EDUCATION', count: 5 }
        }
      }),
      prisma.badge.create({
        data: {
          name: 'Green Warrior',
          description: 'Environmental drive enthusiast',
          icon: 'leaf',
          criteria: { cause: 'ENVIRONMENT', count: 3 }
        }
      })
    ])

    // Assign badges to volunteers
    await Promise.all([
      prisma.userBadge.create({
        data: {
          userId: volunteers[0].id,
          badgeId: badges[1].id
        }
      }),
      prisma.userBadge.create({
        data: {
          userId: volunteers[1].id,
          badgeId: badges[2].id
        }
      })
    ])

    // Sample CSR Application
    await prisma.cSRApplication.create({
      data: {
        ngoId: ngoUsers[0].ngoProfile!.id,
        csrPartnerId: csrPartner.csrProfile!.id,
        title: 'Digital Education Initiative for Rural Schools',
        description: 'Expand digital literacy program to 10 rural schools in Maharashtra',
        proposal: 'Comprehensive 6-month program to set up computer labs and train teachers in 10 rural schools, impacting 500+ children.',
        budgetAmount: 500000,
        milestones: [
          { description: 'Setup computer labs', amount: 200000, deadline: '2024-03-30' },
          { description: 'Teacher training', amount: 150000, deadline: '2024-04-30' },
          { description: 'Student programs', amount: 150000, deadline: '2024-06-30' }
        ],
        status: 'APPROVED',
        submittedAt: new Date('2024-01-15'),
        reviewedAt: new Date('2024-01-25'),
        fundedAt: new Date('2024-02-01')
      }
    })

    // Sample Allocation Scores
    await Promise.all(
      ngoUsers.map(async (ngo) => {
        await prisma.allocationScore.create({
          data: {
            ngoId: ngo.ngoProfile!.id,
            avgRatingScore: Math.floor(Math.random() * 20) + 80, // 80-100
            volunteerEngagementScore: Math.floor(Math.random() * 30) + 70, // 70-100
            impactMetricsScore: Math.floor(Math.random() * 25) + 75, // 75-100
            timelyReportingScore: Math.floor(Math.random() * 15) + 85, // 85-100
            profileCompletenessScore: Math.floor(Math.random() * 10) + 90, // 90-100
            compositeScore: Math.floor(Math.random() * 15) + 80, // 80-95
          }
        })
      })
    )

    // System Settings
    await Promise.all([
      prisma.systemSetting.create({
        data: { key: 'scoring_weights_avg_rating', value: '30' }
      }),
      prisma.systemSetting.create({
        data: { key: 'scoring_weights_volunteer_engagement', value: '20' }
      }),
      prisma.systemSetting.create({
        data: { key: 'scoring_weights_impact_metrics', value: '20' }
      }),
      prisma.systemSetting.create({
        data: { key: 'scoring_weights_timely_reporting', value: '15' }
      }),
      prisma.systemSetting.create({
        data: { key: 'scoring_weights_profile_completeness', value: '15' }
      }),
      prisma.systemSetting.create({
        data: { key: 'platform_email', value: 'contact@wechangemakers.org' }
      }),
      prisma.systemSetting.create({
        data: { key: 'platform_phone', value: '+91 98765 43210' }
      })
    ])

    console.log('Database seeding completed successfully!')
    console.log('Sample login credentials:')
    console.log('Admin: admin@wechangemakers.org / password123')
    console.log('Volunteer: priya.sharma@example.com / password123') 
    console.log('NGO: contact@teachforindia.org / password123')
    console.log('CSR Partner: csr@techcorp.com / password123')

  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
}