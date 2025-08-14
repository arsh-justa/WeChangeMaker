# WeChangeMakers - Impact, Transparency, Recognition Platform

A comprehensive volunteer management platform connecting volunteers, NGOs, and CSR partners to create measurable social impact across India.

## 🌟 Features

### For Volunteers
- **Personalized Drive Discovery**: AI-powered recommendations based on interests and location
- **Impact Portfolio**: Track hours, skills, badges, and certificates with LinkedIn integration
- **Gamified Experience**: Level system, badges, and leaderboards with anti-gaming measures
- **Seamless Check-in/out**: QR code verification and GPS-enabled attendance
- **Social Recognition**: Referral system and community achievements

### For NGOs
- **Drive Management**: Create, manage, and track volunteer drives with real-time analytics
- **Volunteer Engagement**: Automated approvals, messaging, and feedback collection  
- **Impact Reporting**: CSR-ready reports with verified metrics and media evidence
- **Trust Building**: Verified badges, transparency scores, and public ratings
- **Funding Applications**: Direct CSR partner connections with proposal management

### For CSR Partners
- **Transparent Allocation**: Data-driven fund distribution with real-time tracking
- **Measurable Outcomes**: Cost-per-impact metrics and geographic/cause analysis
- **Compliance Ready**: CSR-2 compliant reports and audit trails
- **Partner Directory**: Curated NGO selection with performance ratings

### For Super Admins
- **Ecosystem Oversight**: User management, document verification, and fraud detection
- **Analytics Dashboard**: Growth metrics, engagement analytics, and trend analysis
- **Content Management**: Featured entities, banners, and system messaging
- **Trust & Safety**: Review moderation, anomaly detection, and audit logging

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ (App Router), React 18, TypeScript
- **UI/UX**: Tailwind CSS, shadcn/ui, Radix UI primitives
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL with full-text search
- **Authentication**: NextAuth.js with JWT and OAuth
- **File Storage**: AWS S3 compatible
- **Real-time**: WebSocket connections for live updates
- **Mobile**: Responsive web (React Native ready)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/wechangemakers.git
   cd wechangemakers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   - Database URL
   - NextAuth secret and OAuth credentials
   - Email/SMS service API keys
   - File storage credentials

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed sample data
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Main app: http://localhost:3000
   - Database studio: `npx prisma studio`

### Sample Login Credentials

After seeding, you can login with these test accounts:

- **Super Admin**: admin@wechangemakers.org / password123
- **Volunteer**: priya.sharma@example.com / password123  
- **NGO**: contact@teachforindia.org / password123
- **CSR Partner**: csr@techcorp.com / password123

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── volunteer/         # Volunteer dashboard
│   ├── ngo/              # NGO dashboard  
│   ├── csr/              # CSR partner dashboard
│   ├── admin/            # Super admin dashboard
│   └── api/              # API routes
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   └── layout/          # Layout components
├── lib/                 # Utility libraries
│   ├── prisma.ts        # Database client
│   ├── auth.ts          # Authentication config
│   └── utils.ts         # Helper functions
├── prisma/              # Database schema and migrations
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## 🔧 Key Features Implementation

### Role-Based Access Control
```typescript
// Middleware protection for routes
export function requireAuth(roles: UserRole[]) {
  // Implementation in lib/auth.ts
}
```

### Certificate Generation
```typescript
// Automated certificate generation with QR verification
import { CertificateGenerator } from '@/lib/certificate-generator'

const certificate = await generator.generateCertificate({
  volunteerName,
  ngoName, 
  driveTitle,
  hours,
  verificationHash
})
```

### Allocation Scoring Engine
```typescript
// Transparent CSR fund allocation based on NGO performance
const engine = new AllocationScoringEngine(weights)
const score = engine.calculateCompositeScore(components)
```

## 🎯 Core Business Rules

### Check-in/Check-out System
- Check-in allowed: Drive start - 30min to Drive end + 60min
- GPS location verification (configurable radius)
- Host approval required for hour verification
- Only verified completions earn certificates

### Rating & Review System  
- Only verified volunteers can rate NGOs
- NGOs can post one public response per review
- Flagged reviews hidden pending moderation
- Ratings influence allocation scoring

### Gamification System
- **Bronze**: New volunteers (0+ hours)
- **Silver**: Regular volunteers (10+ hours) 
- **Gold**: Committed volunteers (50+ hours, 4.5+ rating)
- **Platinum**: Champions (100+ hours, 1+ referral)

### Anti-Fraud Measures
- Anomaly detection for mass registrations
- Rate limiting on sensitive actions
- Audit logging for all critical operations
- Manual review triggers for suspicious activity

## 🔒 Security & Compliance

### Data Protection
- Encryption at rest and in transit
- Role-based data access controls
- GDPR-compliant data handling
- Secure file upload validation

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Alternative text for images

### Security Headers
- Content Security Policy (CSP)
- HTTPS enforcement
- Rate limiting on API endpoints
- Input validation and sanitization

## 📊 Analytics & Monitoring

### Key Metrics Tracked
- Volunteer engagement and retention
- NGO performance and ratings
- CSR fund utilization and impact
- Platform growth and adoption
- Geographic and cause-wise distribution

### Reporting Capabilities
- Real-time dashboard analytics
- Exportable CSR compliance reports
- Impact measurement documentation
- Audit trails and activity logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Prettier for code formatting
- Write unit tests for business logic
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all NGO partners for their mission-driven work
- Volunteer community for their dedication to social impact  
- Open source libraries that power this platform
- Design inspiration from leading social impact platforms

## 📞 Support

For support, email contact@wechangemakers.org or create an issue in this repository.

---

**WeChangeMakers** - *Empowering every act of kindness with impact, transparency, and recognition.*