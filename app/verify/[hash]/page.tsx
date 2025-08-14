'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Clock, 
  Building2,
  User,
  Award,
  Download,
  Share,
  Loader2
} from 'lucide-react'

interface VerificationData {
  isValid: boolean
  volunteer: {
    name: string
  }
  drive: {
    title: string
    date: string
    ngo: string
  }
  hours: number
  issuedAt: string
  certificateId: string
}

export default function CertificateVerificationPage({ params }: { params: { hash: string } }) {
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function verifyCertificate() {
      try {
        const response = await fetch(`/api/verify/${params.hash}`)
        
        if (response.ok) {
          const data = await response.json()
          setVerificationData(data)
        } else {
          const error = await response.json()
          setError(error.error || 'Certificate verification failed')
        }
      } catch (err) {
        setError('Network error during verification')
      } finally {
        setIsLoading(false)
      }
    }

    verifyCertificate()
  }, [params.hash])

  const shareVerification = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WeChangeMakers Certificate Verification',
          text: `Verified volunteer certificate for ${verificationData?.volunteer.name}`,
          url: url,
        })
      } catch (err) {
        // Fallback to copy to clipboard
        await navigator.clipboard.writeText(url)
        alert('Verification link copied to clipboard!')
      }
    } else {
      // Fallback for browsers without Web Share API
      await navigator.clipboard.writeText(url)
      alert('Verification link copied to clipboard!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          
          {error ? (
            // Error State
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-red-800">Certificate Verification Failed</CardTitle>
                <CardDescription className="text-red-600">
                  {error}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Please check the verification link or contact support if you believe this is an error.
                </p>
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Success State
            <div className="space-y-6">
              
              {/* Verification Status */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <CardTitle className="text-green-800">Certificate Verified Successfully</CardTitle>
                  <CardDescription className="text-green-600">
                    This certificate is authentic and issued by WeChangeMakers
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Certificate Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Certificate Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Volunteer Info */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Volunteer Name</p>
                      <p className="font-semibold text-lg">{verificationData?.volunteer.name}</p>
                    </div>
                  </div>

                  {/* Drive Info */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Drive Title</p>
                        <p className="font-medium">{verificationData?.drive.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Organization</p>
                        <p className="font-medium">{verificationData?.drive.ngo}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Drive Date</p>
                        <p className="font-medium">
                          {verificationData?.drive.date && 
                            new Date(verificationData.drive.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long', 
                              day: 'numeric'
                            })
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Volunteer Hours</p>
                        <p className="font-medium">{verificationData?.hours} hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Metadata */}
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Certificate ID</p>
                        <p className="font-mono text-xs bg-gray-100 p-1 rounded">
                          {verificationData?.certificateId}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Issued Date</p>
                        <p className="font-medium">
                          {verificationData?.issuedAt && 
                            new Date(verificationData.issuedAt).toLocaleDateString('en-IN')
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button onClick={shareVerification} className="flex-1">
                      <Share className="h-4 w-4 mr-2" />
                      Share Verification
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Digitally Verified
                    </Badge>
                    <p className="text-xs text-gray-600">
                      This certificate is cryptographically signed and tamper-proof
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* About WeChangeMakers */}
              <Card>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold mb-2">About WeChangeMakers</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    WeChangeMakers is India's trusted volunteer platform connecting 
                    change-makers with meaningful opportunities to create social impact.
                  </p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}