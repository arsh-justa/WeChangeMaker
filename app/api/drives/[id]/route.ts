import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET drive by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const drive = await prisma.drive.findUnique({
      where: { id: params.id },
      include: {
        ngo: true,
        registrations: {
          include: {
            volunteer: true
          }
        }
      }
    })

    if (!drive) {
      return NextResponse.json({ error: 'Drive not found' }, { status: 404 })
    }

    return NextResponse.json(drive)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update entire drive
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const updatedDrive = await prisma.drive.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        cause: body.cause,
        type: body.type,
        location: body.location,
        address: body.address,
        coordinates: body.coordinates,
        startAt: new Date(body.startAt),
        endAt: new Date(body.endAt),
        capacity: body.capacity,
        requiredSkills: body.requiredSkills,
        materialsNeeded: body.materialsNeeded,
        status: body.status,
        pocName: body.pocName,
        pocEmail: body.pocEmail,
        pocMobile: body.pocMobile,
        images: body.images,
        documents: body.documents,
        beneficiariesCount: body.beneficiariesCount,
        outcomesMetrics: body.outcomesMetrics,
        impactStory: body.impactStory,
      }
    })

    return NextResponse.json(updatedDrive)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update drive' }, { status: 500 })
  }
}

// PATCH - Partial update
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Handle date fields properly
    if (body.startAt) body.startAt = new Date(body.startAt)
    if (body.endAt) body.endAt = new Date(body.endAt)
    
    const updatedDrive = await prisma.drive.update({
      where: { id: params.id },
      data: body
    })

    return NextResponse.json(updatedDrive)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update drive' }, { status: 500 })
  }
}
