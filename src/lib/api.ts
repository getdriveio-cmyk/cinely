// Mock API functions for dashboard data
// In a real app, these would make HTTP requests to your backend

export interface Title {
  id: string
  title: string
  slug: string
  description?: string
  posterUrl?: string
  backdropUrl?: string
  releaseDate?: string
  durationSec?: number
  genres: string[]
  rating?: string
  muxPlaybackId?: string
  isFree: boolean
  isOriginal: boolean
}

export interface ContinueWatchingItem {
  title: Title
  progressPct: number
  lastPosSec: number
  muxPlaybackId: string
}

export interface WatchlistItem {
  title: Title
  posterUrl: string
  slug: string
  durationSec: number
}

export interface RecommendationItem {
  title: Title
  reason: 'because_you_watched' | 'popular_in_genre'
}

export interface NotificationItem {
  id: string
  title: string
  body: string
  href?: string
  read: boolean
}

export interface DashboardData {
  continueWatching: ContinueWatchingItem[]
  watchlist: WatchlistItem[]
  recommendations: RecommendationItem[]
  trending7d: Title[]
  newlyAdded: Title[]
  notifications: NotificationItem[]
}

// Mock data
export const mockTitles: Title[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterUrl: '/src/assets/poster-1.jpg',
    backdropUrl: '/src/assets/hero-banner.jpg',
    releaseDate: '2008-07-18',
    durationSec: 9120, // 2h 32m
    genres: ['Action', 'Crime', 'Drama'],
    rating: 'PG-13',
    muxPlaybackId: 'VZtzUzGRv02J4xnwkxW8j6EO1TIClQDkF7A',
    isFree: true,
    isOriginal: false
  },
  {
    id: '2',
    title: 'Inception',
    slug: 'inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: '/src/assets/poster-2.jpg',
    backdropUrl: '/src/assets/hero-banner.jpg',
    releaseDate: '2010-07-16',
    durationSec: 8880, // 2h 28m
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    rating: 'PG-13',
    muxPlaybackId: 'VZtzUzGRv02J4xnwkxW8j6EO1TIClQDkF7A',
    isFree: false,
    isOriginal: false
  },
  {
    id: '3',
    title: 'Interstellar',
    slug: 'interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    posterUrl: '/src/assets/poster-3.jpg',
    backdropUrl: '/src/assets/hero-banner.jpg',
    releaseDate: '2014-11-07',
    durationSec: 10200, // 2h 50m
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    rating: 'PG-13',
    muxPlaybackId: 'VZtzUzGRv02J4xnwkxW8j6EO1TIClQDkF7A',
    isFree: true,
    isOriginal: false
  },
  {
    id: '4',
    title: 'Cinely Original: The Last Stand',
    slug: 'cinely-original-the-last-stand',
    description: 'An exclusive Cinely original series about survival in a post-apocalyptic world.',
    posterUrl: '/src/assets/poster-4.jpg',
    backdropUrl: '/src/assets/hero-banner.jpg',
    releaseDate: '2024-01-15',
    durationSec: 3600, // 1h
    genres: ['Drama', 'Thriller', 'Sci-Fi'],
    rating: 'R',
    muxPlaybackId: 'VZtzUzGRv02J4xnwkxW8j6EO1TIClQDkF7A',
    isFree: false,
    isOriginal: true
  },
  {
    id: '5',
    title: 'Pulp Fiction',
    slug: 'pulp-fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    posterUrl: '/src/assets/poster-5.jpg',
    backdropUrl: '/src/assets/hero-banner.jpg',
    releaseDate: '1994-10-14',
    durationSec: 9240, // 2h 34m
    genres: ['Crime', 'Drama'],
    rating: 'R',
    muxPlaybackId: 'VZtzUzGRv02J4xnwkxW8j6EO1TIClQDkF7A',
    isFree: true,
    isOriginal: false
  },
  {
    id: '6',
    title: 'The Matrix',
    slug: 'the-matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: '/src/assets/poster-6.jpg',
    backdropUrl: '/src/assets/hero-banner.jpg',
    releaseDate: '1999-03-31',
    durationSec: 8160, // 2h 16m
    genres: ['Action', 'Sci-Fi'],
    rating: 'R',
    muxPlaybackId: 'VZtzUzGRv02J4xnwkxW8j6EO1TIClQDkF7A',
    isFree: false,
    isOriginal: false
  },
  {
    id: '7',
    title: 'Numb',
    slug: 'numb',
    description: 'A gripping psychological thriller that follows a man who loses the ability to feel physical pain after a traumatic accident. As he navigates a world where he can no longer distinguish between safety and danger, he discovers that emotional numbness might be the real curse. This intense character study explores themes of trauma, healing, and the human need for connection in a world that has become increasingly disconnected.',
    posterUrl: '/dist/assets/images.png',
    backdropUrl: '/src/assets/hero-banner.jpg',
    releaseDate: '2024-12-15',
    durationSec: 7200, // 2h
    genres: ['Drama', 'Thriller', 'Psychological'],
    rating: 'R',
    muxPlaybackId: 'VZtzUzGRv02J4xnwkxW8j6EO1TIClQDkF7A',
    isFree: true,
    isOriginal: true
  }
]

export const mockDashboardData: DashboardData = {
  continueWatching: [
    {
      title: mockTitles[0],
      progressPct: 45,
      lastPosSec: 4104, // 45% of 9120 seconds
      muxPlaybackId: 'mock-playback-1'
    },
    {
      title: mockTitles[2],
      progressPct: 20,
      lastPosSec: 2040, // 20% of 10200 seconds
      muxPlaybackId: 'mock-playback-3'
    }
  ],
  watchlist: [
    {
      title: mockTitles[1],
      posterUrl: '/src/assets/poster-2.jpg',
      slug: 'inception',
      durationSec: 8880
    },
    {
      title: mockTitles[3],
      posterUrl: '/src/assets/poster-4.jpg',
      slug: 'cinely-original-the-last-stand',
      durationSec: 3600
    }
  ],
  recommendations: [
    {
      title: mockTitles[1],
      reason: 'because_you_watched'
    },
    {
      title: mockTitles[5],
      reason: 'popular_in_genre'
    },
    {
      title: mockTitles[6], // Numb
      reason: 'popular_in_genre'
    }
  ],
  trending7d: [mockTitles[0], mockTitles[2], mockTitles[4], mockTitles[6]], // Added Numb
  newlyAdded: [mockTitles[6], mockTitles[3], mockTitles[1]], // Numb as newest
  notifications: [
    {
      id: '1',
      title: 'New Cinely Original',
      body: 'Numb - A gripping psychological thriller is now streaming!',
      href: '/watch/numb',
      read: false
    },
    {
      id: '2',
      title: 'New Release',
      body: 'The Last Stand Season 2 is now available!',
      href: '/watch/cinely-original-the-last-stand',
      read: false
    },
    {
      id: '3',
      title: 'Watchlist Update',
      body: 'Inception is now available to watch',
      href: '/watch/inception',
      read: true
    }
  ]
}

// Mock API functions
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockDashboardData
}

export const toggleWatchlist = async (titleId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  // Mock implementation - in real app, this would call your API
  return Math.random() > 0.5 // Randomly return true/false for demo
}

export const updateContinueWatching = async (data: {
  titleId: string
  lastPosSec: number
  durationSec: number
  completed?: boolean
}): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  console.log('Updated continue watching:', data)
}

export const getPlaybackToken = async (titleId: string, device: string): Promise<string | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  // For now, return null to use public playback
  // In production, this would return a signed JWT token for private content
  return null
}

export const markNotificationRead = async (notificationId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  console.log('Marked notification as read:', notificationId)
}
