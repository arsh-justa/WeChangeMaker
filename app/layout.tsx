import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'WeChangeMakers - Empowering Every Act of Kindness',
  description: 'Turn every hour into impact. Discover drives, track your contribution, and get recognized. Join thousands of volunteers making a real difference in communities across India.',
  keywords: 'volunteering, NGO, CSR, social impact, community service, India, volunteer platform',
  openGraph: {
    title: 'WeChangeMakers - Empowering Every Act of Kindness',
    description: 'Turn every hour into impact. Discover drives, track your contribution, and get recognized.',
    url: 'https://wechangemakers.org',
    siteName: 'WeChangeMakers',
    images: [
      {
        url: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1',
        width: 1200,
        height: 630,
        alt: 'WeChangeMakers Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeChangeMakers - Empowering Every Act of Kindness',
    description: 'Turn every hour into impact. Join thousands of volunteers making a difference.',
    images: ['https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}