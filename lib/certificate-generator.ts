import jsPDF from 'jspdf'
import QRCode from 'qrcode'

interface CertificateData {
  volunteerName: string
  ngoName: string
  driveTitle: string
  date: string
  hours: number
  verificationHash: string
  certificateId: string
}

export class CertificateGenerator {
  private pdf: jsPDF
  
  constructor() {
    this.pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })
  }

  async generateCertificate(data: CertificateData): Promise<string> {
    const { pdf } = this
    
    // Set up colors
    const primaryBlue = '#1E40AF'
    const secondaryPurple = '#7C3AED'
    const goldAccent = '#F59E0B'
    
    // Background gradient effect
    pdf.setFillColor(245, 247, 250)
    pdf.rect(0, 0, 297, 210, 'F')
    
    // Header border
    pdf.setFillColor(30, 64, 175)
    pdf.rect(0, 0, 297, 20, 'F')
    
    pdf.setFillColor(124, 58, 237)
    pdf.rect(0, 190, 297, 20, 'F')
    
    // Certificate border
    pdf.setDrawColor(30, 64, 175)
    pdf.setLineWidth(2)
    pdf.rect(15, 15, 267, 180)
    
    // Inner decorative border
    pdf.setDrawColor(124, 58, 237)
    pdf.setLineWidth(1)
    pdf.rect(20, 20, 257, 170)
    
    // Title
    pdf.setFontSize(36)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(30, 64, 175)
    pdf.text('CERTIFICATE OF APPRECIATION', 148.5, 50, { align: 'center' })
    
    // Subtitle
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(107, 114, 128)
    pdf.text('For Outstanding Volunteer Service', 148.5, 62, { align: 'center' })
    
    // Decorative line
    pdf.setDrawColor(245, 158, 11)
    pdf.setLineWidth(3)
    pdf.line(80, 68, 217, 68)
    
    // Main content
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(55, 65, 81)
    pdf.text('This is to certify that', 148.5, 85, { align: 'center' })
    
    // Volunteer name
    pdf.setFontSize(32)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(30, 64, 175)
    pdf.text(data.volunteerName.toUpperCase(), 148.5, 105, { align: 'center' })
    
    // Achievement text
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(55, 65, 81)
    const achievementText = `has successfully completed ${data.hours} volunteer hours in the drive`
    pdf.text(achievementText, 148.5, 120, { align: 'center' })
    
    // Drive title
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(124, 58, 237)
    pdf.text(`"${data.driveTitle}"`, 148.5, 135, { align: 'center' })
    
    // NGO and date
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(55, 65, 81)
    pdf.text(`organized by ${data.ngoName}`, 148.5, 148, { align: 'center' })
    pdf.text(`on ${new Date(data.date).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, 148.5, 160, { align: 'center' })
    
    // Generate and add QR code
    const qrCodeDataUrl = await QRCode.toDataURL(
      `https://wechangemakers.org/verify/${data.verificationHash}`,
      {
        width: 100,
        margin: 1,
        color: {
          dark: '#1E40AF',
          light: '#FFFFFF'
        }
      }
    )
    
    // Add QR code
    pdf.addImage(qrCodeDataUrl, 'PNG', 25, 140, 30, 30)
    
    // QR code label
    pdf.setFontSize(8)
    pdf.setTextColor(107, 114, 128)
    pdf.text('Scan to verify', 40, 175, { align: 'center' })
    
    // Certificate ID and branding
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(107, 114, 128)
    pdf.text(`Certificate ID: ${data.certificateId}`, 242, 175, { align: 'center' })
    pdf.text('WeChangeMakers.org', 242, 182, { align: 'center' })
    
    // Digital signature placeholder
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(30, 64, 175)
    pdf.text('Digitally Verified', 242, 155, { align: 'center' })
    
    // Add decorative elements
    this.addDecorativeElements(pdf)
    
    // Return base64 string
    return pdf.output('datauristring')
  }
  
  private addDecorativeElements(pdf: jsPDF) {
    // Left corner decoration
    pdf.setFillColor(245, 158, 11)
    pdf.circle(30, 30, 3, 'F')
    pdf.circle(30, 180, 3, 'F')
    
    // Right corner decoration  
    pdf.circle(267, 30, 3, 'F')
    pdf.circle(267, 180, 3, 'F')
    
    // Add some small stars
    const stars = [
      { x: 50, y: 75 },
      { x: 247, y: 75 },
      { x: 70, y: 125 },
      { x: 227, y: 125 }
    ]
    
    stars.forEach(star => {
      this.drawStar(pdf, star.x, star.y, 2)
    })
  }
  
  private drawStar(pdf: jsPDF, x: number, y: number, radius: number) {
    const points = 5
    const outerRadius = radius
    const innerRadius = radius * 0.4
    
    pdf.setFillColor(245, 158, 11)
    
    let path = []
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points
      const r = i % 2 === 0 ? outerRadius : innerRadius
      const px = x + Math.cos(angle) * r
      const py = y + Math.sin(angle) * r
      
      if (i === 0) {
        path.push(['m', px, py])
      } else {
        path.push(['l', px, py])
      }
    }
    path.push(['h'])
    
    // Simple circle as star replacement for now
    pdf.circle(x, y, radius, 'F')
  }
}

// Utility function to generate certificate
export async function generateVolunteerCertificate(
  certificateData: CertificateData
): Promise<string> {
  const generator = new CertificateGenerator()
  return await generator.generateCertificate(certificateData)
}

// Function to generate verification hash
export function generateVerificationHash(
  volunteerId: string,
  driveId: string,
  completionDate: string
): string {
  const data = `${volunteerId}-${driveId}-${completionDate}`
  // In a real implementation, use a proper cryptographic hash
  return Buffer.from(data).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)
}