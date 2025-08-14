import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { hash: string } }
) {
  try {
    const verificationHash = params.hash

    // Find certificate by verification hash
    const certificate = await prisma.certificate.findUnique({
      where: { verificationHash },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        drive: {
          select: {
            title: true,
            startAt: true,
            ngo: {
              select: {
                organizationName: true
              }
            }
          }
        },
        registration: {
          select: {
            verifiedHours: true,
            checkinTime: true,
            checkoutTime: true
          }
        }
      }
    })

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found or invalid verification hash' },
        { status: 404 }
      )
    }

    // Return certificate verification data
    const verificationData = {
      isValid: true,
      volunteer: {
        name: certificate.user.name,
        // Hide email for privacy, only show for admin verification
      },
      drive: {
        title: certificate.drive.title,
        date: certificate.drive.startAt,
        ngo: certificate.drive.ngo.organizationName
      },
      hours: certificate.registration.verifiedHours,
      issuedAt: certificate.issuedAt,
      certificateId: certificate.id
    }

    return NextResponse.json(verificationData)

  } catch (error) {
    console.error('Certificate verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error during verification' },
      { status: 500 }
    )
  }
}