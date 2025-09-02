import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface UserProfile {
  userId: string
  displayName?: string
  avatarUrl?: string
  country?: string
  onboardingAt?: Date
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: () => Promise<void>
  signOut: () => void
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const session = localStorage.getItem('cinely_session')
    if (session) {
      try {
        const sessionData = JSON.parse(session)
        if (sessionData.user && sessionData.profile) {
          setUser(sessionData.user)
          setProfile(sessionData.profile)
        }
      } catch (error) {
        console.error('Error parsing session data:', error)
        localStorage.removeItem('cinely_session')
      }
    }
  }, [])

  const signIn = async () => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Create mock user
    const mockUser: User = {
      id: 'mock-user-123',
      name: 'Demo User',
      email: 'demo@cinely.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    }

    const mockProfile: UserProfile = {
      userId: mockUser.id,
      displayName: mockUser.name,
      avatarUrl: mockUser.image,
      country: 'US',
      onboardingAt: null // Will trigger onboarding flow
    }

    setUser(mockUser)
    setProfile(mockProfile)

    // Save to localStorage
    localStorage.setItem('cinely_session', JSON.stringify({
      user: mockUser,
      profile: mockProfile
    }))

    setIsLoading(false)
    console.log('Mock user signed in:', mockUser)
  }

  const signOut = () => {
    setUser(null)
    setProfile(null)
    localStorage.removeItem('cinely_session')
    console.log('Mock user signed out')
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return

    const updatedProfile = { ...profile, ...updates }
    setProfile(updatedProfile)

    // Update localStorage
    const session = localStorage.getItem('cinely_session')
    if (session) {
      const sessionData = JSON.parse(session)
      sessionData.profile = updatedProfile
      localStorage.setItem('cinely_session', JSON.stringify(sessionData))
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}