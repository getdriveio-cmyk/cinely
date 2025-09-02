import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo users
  const user1 = await prisma.user.upsert({
    where: { email: 'demo@cinely.com' },
    update: {},
    create: {
      email: 'demo@cinely.com',
      name: 'Demo User',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      emailVerified: new Date(),
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      emailVerified: new Date(),
    },
  })

  // Create user profiles
  await prisma.userProfile.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      displayName: 'Demo User',
      avatarUrl: user1.image,
      country: 'US',
      onboardingAt: new Date(),
    },
  })

  await prisma.userProfile.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      displayName: 'John Doe',
      avatarUrl: user2.image,
      country: 'US',
      onboardingAt: new Date(),
    },
  })

  // Create user preferences
  await prisma.preference.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      genres: ['Action', 'Drama', 'Sci-Fi', 'Thriller'],
      ratingsMax: 'R',
    },
  })

  await prisma.preference.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      genres: ['Comedy', 'Romance', 'Drama'],
      ratingsMax: 'PG-13',
    },
  })

  // Create titles
  const titles = [
    {
      id: '1',
      title: 'The Dark Knight',
      slug: 'the-dark-knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      posterUrl: '/src/assets/poster-1.jpg',
      backdropUrl: '/src/assets/hero-banner.jpg',
      releaseDate: new Date('2008-07-18'),
      durationSec: 9120, // 2h 32m
      genres: ['Action', 'Crime', 'Drama'],
      rating: 'PG-13',
      muxPlaybackId: 'mock-playback-1',
      muxAssetId: 'mock-asset-1',
      isFree: true,
      isOriginal: false,
    },
    {
      id: '2',
      title: 'Inception',
      slug: 'inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      posterUrl: '/src/assets/poster-2.jpg',
      backdropUrl: '/src/assets/hero-banner.jpg',
      releaseDate: new Date('2010-07-16'),
      durationSec: 8880, // 2h 28m
      genres: ['Action', 'Sci-Fi', 'Thriller'],
      rating: 'PG-13',
      muxPlaybackId: 'mock-playback-2',
      muxAssetId: 'mock-asset-2',
      isFree: false,
      isOriginal: false,
    },
    {
      id: '3',
      title: 'Interstellar',
      slug: 'interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      posterUrl: '/src/assets/poster-3.jpg',
      backdropUrl: '/src/assets/hero-banner.jpg',
      releaseDate: new Date('2014-11-07'),
      durationSec: 10200, // 2h 50m
      genres: ['Adventure', 'Drama', 'Sci-Fi'],
      rating: 'PG-13',
      muxPlaybackId: 'mock-playback-3',
      muxAssetId: 'mock-asset-3',
      isFree: true,
      isOriginal: false,
    },
    {
      id: '4',
      title: 'Cinely Original: The Last Stand',
      slug: 'cinely-original-the-last-stand',
      description: 'An exclusive Cinely original series about survival in a post-apocalyptic world.',
      posterUrl: '/src/assets/poster-4.jpg',
      backdropUrl: '/src/assets/hero-banner.jpg',
      releaseDate: new Date('2024-01-15'),
      durationSec: 3600, // 1h
      genres: ['Drama', 'Thriller', 'Sci-Fi'],
      rating: 'R',
      muxPlaybackId: 'mock-playback-4',
      muxAssetId: 'mock-asset-4',
      isFree: false,
      isOriginal: true,
    },
    {
      id: '5',
      title: 'Pulp Fiction',
      slug: 'pulp-fiction',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      posterUrl: '/src/assets/poster-5.jpg',
      backdropUrl: '/src/assets/hero-banner.jpg',
      releaseDate: new Date('1994-10-14'),
      durationSec: 9240, // 2h 34m
      genres: ['Crime', 'Drama'],
      rating: 'R',
      muxPlaybackId: 'mock-playback-5',
      muxAssetId: 'mock-asset-5',
      isFree: true,
      isOriginal: false,
    },
    {
      id: '6',
      title: 'The Matrix',
      slug: 'the-matrix',
      description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      posterUrl: '/src/assets/poster-6.jpg',
      backdropUrl: '/src/assets/hero-banner.jpg',
      releaseDate: new Date('1999-03-31'),
      durationSec: 8160, // 2h 16m
      genres: ['Action', 'Sci-Fi'],
      rating: 'R',
      muxPlaybackId: 'mock-playback-6',
      muxAssetId: 'mock-asset-6',
      isFree: false,
      isOriginal: false,
    },
  ]

  for (const title of titles) {
    await prisma.title.upsert({
      where: { id: title.id },
      update: {},
      create: title,
    })
  }

  // Create continue watching entries
  await prisma.continueWatching.upsert({
    where: { 
      userId_titleId: { 
        userId: user1.id, 
        titleId: '1' 
      } 
    },
    update: {},
    create: {
      userId: user1.id,
      titleId: '1',
      lastPosSec: 4104, // 45% of 9120 seconds
      durationSec: 9120,
      lastUpdatedAt: new Date(),
    },
  })

  await prisma.continueWatching.upsert({
    where: { 
      userId_titleId: { 
        userId: user1.id, 
        titleId: '3' 
      } 
    },
    update: {},
    create: {
      userId: user1.id,
      titleId: '3',
      lastPosSec: 2040, // 20% of 10200 seconds
      durationSec: 10200,
      lastUpdatedAt: new Date(),
    },
  })

  // Create watchlist entries
  await prisma.watchlist.upsert({
    where: { 
      userId_titleId: { 
        userId: user1.id, 
        titleId: '2' 
      } 
    },
    update: {},
    create: {
      userId: user1.id,
      titleId: '2',
      addedAt: new Date(),
    },
  })

  await prisma.watchlist.upsert({
    where: { 
      userId_titleId: { 
        userId: user1.id, 
        titleId: '4' 
      } 
    },
    update: {},
    create: {
      userId: user1.id,
      titleId: '4',
      addedAt: new Date(),
    },
  })

  // Create watch history
  await prisma.watchHistory.create({
    data: {
      userId: user1.id,
      titleId: '1',
      startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      completed: true,
      minutes: 152, // 2h 32m
      device: 'Chrome on MacBook Pro',
    },
  })

  await prisma.watchHistory.create({
    data: {
      userId: user1.id,
      titleId: '3',
      startedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      completed: false,
      minutes: 34, // 34 minutes
      device: 'Safari on iPhone',
    },
  })

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: user1.id,
      kind: 'new_release',
      title: 'New Release',
      body: 'The Last Stand Season 2 is now available!',
      href: '/watch/cinely-original-the-last-stand',
      read: false,
    },
  })

  await prisma.notification.create({
    data: {
      userId: user1.id,
      kind: 'promo',
      title: 'Watchlist Update',
      body: 'Inception is now available to watch',
      href: '/watch/inception',
      read: true,
    },
  })

  // Create recommendation seeds
  const recommendationSeeds = [
    { titleId: '1', genre: 'Action', weight: 1.0 },
    { titleId: '1', genre: 'Crime', weight: 0.8 },
    { titleId: '1', genre: 'Drama', weight: 0.6 },
    { titleId: '2', genre: 'Action', weight: 0.9 },
    { titleId: '2', genre: 'Sci-Fi', weight: 1.0 },
    { titleId: '2', genre: 'Thriller', weight: 0.9 },
    { titleId: '3', genre: 'Adventure', weight: 0.8 },
    { titleId: '3', genre: 'Drama', weight: 0.7 },
    { titleId: '3', genre: 'Sci-Fi', weight: 1.0 },
    { titleId: '4', genre: 'Drama', weight: 0.9 },
    { titleId: '4', genre: 'Thriller', weight: 1.0 },
    { titleId: '4', genre: 'Sci-Fi', weight: 0.8 },
    { titleId: '5', genre: 'Crime', weight: 1.0 },
    { titleId: '5', genre: 'Drama', weight: 0.8 },
    { titleId: '6', genre: 'Action', weight: 1.0 },
    { titleId: '6', genre: 'Sci-Fi', weight: 1.0 },
  ]

  for (const seed of recommendationSeeds) {
    await prisma.recommendationSeed.create({
      data: seed,
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
