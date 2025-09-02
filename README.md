# Cinely - Premium Streaming Platform

A modern streaming platform built with React, TypeScript, and Vite. Features personalized dashboards, content recommendations, and a complete user authentication system.

## 🚀 Features

### User Experience
- **Personalized Dashboard**: Tailored content recommendations and continue watching
- **Onboarding Flow**: 3-step setup for new users (genres, ratings, preferences)
- **Watch Progress**: Resume functionality with real-time progress tracking
- **Watchlist Management**: Save and organize favorite content
- **Notifications**: In-app notifications for new releases and updates

### Content & Streaming
- **Video Player**: Mux-powered streaming with signed playback tokens
- **Content Discovery**: Trending, newly added, and recommended content
- **Search & Browse**: Advanced content filtering and search
- **Multiple Plans**: AVOD (free with ads) and Ad-Free premium tiers

### Account Management
- **Profile Settings**: Customizable user profiles and preferences
- **Device Management**: Track connected devices and viewing history
- **Plan Management**: Upgrade/downgrade subscription plans
- **Analytics**: Viewing statistics and watch history

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router with lazy loading
- **State Management**: React Context API
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js compatible (mock implementation)
- **Video**: Mux Video integration
- **Deployment**: Vercel-ready configuration

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Mux account (for video streaming)

### Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd cinely
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/cinely?schema=public"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:8080"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Mux
   MUX_TOKEN_ID="your-mux-token-id"
   MUX_TOKEN_SECRET="your-mux-token-secret"
   MUX_SIGNING_KEY_ID="your-mux-signing-key-id"
   MUX_SIGNING_KEY_PRIVATE="your-mux-signing-key-private"
   
   # Mux Data (for analytics)
   VITE_MUX_DATA_ENV_KEY="your-mux-data-env-key"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
npm run dev
```

   The application will be available at `http://localhost:8080`

## 🎯 Usage

### Demo Login
1. Click the profile icon in the top-right corner
2. Enter any email address when prompted
3. Complete the onboarding flow (3 steps)
4. Explore the personalized dashboard

### Key Features to Try
- **Dashboard**: View personalized content recommendations
- **Continue Watching**: Resume partially watched content
- **Watchlist**: Add/remove titles from your list
- **Watch Page**: Click any title to view the player page
- **Account Settings**: Manage profile and preferences

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── DashboardHeader.tsx
│   ├── Rail.tsx
│   ├── TitleCard.tsx
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── lib/               # Utilities and configurations
│   ├── api.ts         # Mock API functions
│   ├── auth.ts        # Authentication setup
│   └── db.ts          # Database client
├── pages/             # Route components
│   ├── Dashboard.tsx
│   ├── Onboarding.tsx
│   ├── Watch.tsx
│   └── ...
└── utils/             # Helper functions
```

## 🗄 Database Schema

The application uses Prisma with the following key models:

- **User**: Authentication and basic user info
- **UserProfile**: Extended profile information
- **Preference**: User content preferences
- **Title**: Content metadata and Mux integration
- **ContinueWatching**: Resume position tracking
- **WatchHistory**: Viewing analytics
- **Watchlist**: User's saved content
- **Notification**: In-app messaging

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 🔐 Authentication

Currently uses a mock authentication system for demo purposes. To implement real authentication:

1. Set up NextAuth.js with your preferred providers
2. Replace mock functions in `AuthContext.tsx`
3. Update API endpoints to use real authentication

## 📺 Mux Integration

The application uses Shaka Player with Mux Video for streaming:

1. **Shaka Player**: Industry-standard adaptive streaming player
2. **Mux Data Analytics**: Real-time video performance monitoring
3. **Signed Playback**: JWT tokens for secure video access
4. **Playback Restrictions**: Device and user-based access control
5. **Ad Integration**: Google IMA for AVOD content

### Shaka Player Features
- **Adaptive Streaming**: Automatic quality adjustment based on bandwidth
- **Cross-Platform**: Works on all modern browsers and devices
- **HLS Support**: Native HLS streaming support
- **Error Handling**: Robust error recovery and reporting
- **Accessibility**: Built-in accessibility features

## 🧪 Testing

```bash
# Run unit tests (when implemented)
npm test

# Run e2e tests (when implemented)
npm run test:e2e
```

## 📈 Performance

- **Code Splitting**: Lazy-loaded routes and components
- **Image Optimization**: Lazy loading with intersection observer
- **Caching**: SWR for API data caching
- **Bundle Size**: Optimized with Vite's tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [CHANGELOG.md](./CHANGELOG.md) for recent updates
- Review the [Prisma documentation](https://www.prisma.io/docs)
- Check [Mux documentation](https://docs.mux.com) for video integration
- Open an issue on GitHub

## 🔮 Roadmap

- [ ] Real Mux Video integration
- [ ] Stripe billing integration
- [ ] Advanced recommendation engine
- [ ] Mobile app (React Native)
- [ ] Social features (reviews, ratings)
- [ ] Live streaming support
- [ ] Multi-language support
