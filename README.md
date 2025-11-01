# NexBank - Full-Stack Banking Application

A comprehensive, production-ready full-stack banking application built with Next.js 15, TypeScript, and modern web technologies.

## 🚀 Features

### Core Banking Features
- **Account Management**: View and manage multiple bank accounts
- **Transaction History**: Complete transaction tracking with filters and search
- **Payment Transfers**: Send money between accounts securely
- **Bank Integration**: Connect banks via Plaid integration

### Advanced Features
- **Analytics Dashboard**: Comprehensive spending insights with charts and analytics
- **Budget Tracker**: Set budgets, track spending, and monitor financial goals
- **Settings Panel**: Complete user preferences, security, and notification settings
- **Profile Management**: Professional avatar system with UI Avatars
- **Dashboard Stats**: Real-time financial statistics and trends
- **Quick Actions**: Fast access to common banking tasks
- **Transaction Filters**: Advanced filtering with export functionality

### Technical Features
- **TypeScript**: Fully typed application
- **Responsive Design**: Mobile-first, works on all devices
- **Error Handling**: Comprehensive error boundaries and handling
- **Loading States**: Skeleton loaders and loading indicators
- **Security**: Enhanced security with 2FA support
- **Real-time Updates**: Live transaction updates

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn UI
- **Charts**: Chart.js, React Chart.js 2
- **Forms**: React Hook Form, Zod validation
- **Backend**: Appwrite (Database & Auth)
- **Banking APIs**: Plaid (Bank connections), Dwolla (Payments)
- **Monitoring**: Sentry (Error tracking)
- **Deployment**: Vercel ready

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/GreeshmanthBommireddy/NexBank-Banking-Application.git
cd NexBank-Banking-Application
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT=your_appwrite_project_id
NEXT_APPWRITE_KEY=your_appwrite_api_key

# Appwrite Database
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_USER_COLLECTION_ID=your_user_collection_id
APPWRITE_BANK_COLLECTION_ID=your_bank_collection_id

# Plaid Configuration
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret

# Dwolla Configuration
DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret
DWOLLA_ENV=sandbox

# Sentry (Optional)
SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `GreeshmanthBommireddy/NexBank-Banking-Application`
4. Configure environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all the variables from `.env.local`
5. Click **"Deploy"**

### Option 2: Via Vercel CLI

1. Login to Vercel:
```bash
vercel login
```

2. Link your project:
```bash
vercel link
```

3. Deploy to production:
```bash
vercel --prod
```

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (root)/          # Main application pages
│   │   ├── analytics/   # Analytics dashboard
│   │   ├── budget/      # Budget tracker
│   │   ├── settings/    # Settings panel
│   │   └── ...
│   └── api/             # API routes
├── components/          # React components
│   ├── ui/              # UI components
│   └── ...
├── lib/
│   ├── actions/         # Server actions
│   └── utils.ts        # Utility functions
├── constants/          # Constants and configuration
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## 🔐 Environment Variables

All required environment variables are listed in the installation section. Make sure to set up:
- Appwrite configuration for database and authentication
- Plaid credentials for bank connections
- Dwolla credentials for payment processing
- Sentry (optional) for error monitoring

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features Highlights

### Analytics Dashboard
- Monthly spending charts
- Category breakdown visualization
- Income vs expenses analysis
- Financial insights and trends

### Budget Tracker
- Multiple budget categories
- Real-time spending tracking
- Budget alerts and warnings
- Financial goals management

### Transaction Management
- Advanced filtering (category, type, date range)
- Search functionality
- Export to CSV
- Pagination support

### Settings
- Profile management with avatars
- Security settings (2FA, biometric)
- Notification preferences
- App preferences (theme, currency, language)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Greeshmanth Bommireddy**
- Email: greeshmanthbommireddy@gmail.com
- GitHub: [@GreeshmanthBommireddy](https://github.com/GreeshmanthBommireddy)

## 🙏 Acknowledgments

- Built with Next.js and modern web technologies
- UI components from Radix UI and Shadcn
- Banking integrations via Plaid and Dwolla

---

**Note**: This is a production-ready banking application. Ensure all environment variables are properly configured before deployment.
