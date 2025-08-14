import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">WeChangeMakers</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering every act of kindness with impact, transparency, and recognition. 
              Join thousands of volunteers making a real difference in communities across India.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Volunteers</h3>
            <ul className="space-y-2">
              <li><Link href="/drives" className="text-gray-300 hover:text-white transition-colors">Find Drives</Link></li>
              <li><Link href="/volunteer/dashboard" className="text-gray-300 hover:text-white transition-colors">My Dashboard</Link></li>
              <li><Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="/certificates" className="text-gray-300 hover:text-white transition-colors">Certificates</Link></li>
              <li><Link href="/refer" className="text-gray-300 hover:text-white transition-colors">Refer Friends</Link></li>
            </ul>
          </div>

          {/* Organizations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Organizations</h3>
            <ul className="space-y-2">
              <li><Link href="/ngos" className="text-gray-300 hover:text-white transition-colors">NGO Directory</Link></li>
              <li><Link href="/ngo/register" className="text-gray-300 hover:text-white transition-colors">Register NGO</Link></li>
              <li><Link href="/csr" className="text-gray-300 hover:text-white transition-colors">CSR Partners</Link></li>
              <li><Link href="/csr/register" className="text-gray-300 hover:text-white transition-colors">Partner with Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">contact@wechangemakers.org</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">Mumbai, Delhi, Bangalore</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 WeChangeMakers. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}