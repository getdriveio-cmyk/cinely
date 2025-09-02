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
  signIn: (email: string) => Promise<void>
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const session = localStorage.getItem('cinely_session')
        if (session) {
          const sessionData = JSON.parse(session)
          setUser(sessionData.user)
          setProfile(sessionData.profile)
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const signIn = async (email: string) => {
    setIsLoading(true)
    try {
      // Mock authentication - in real app, this would call your API
      const mockUser: User = {
        id: 'mock-user-id',
        name: 'Demo User',
        email: email,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }

      const mockProfile: UserProfile = {
        userId: mockUser.id,
        displayName: mockUser.name,
        avatarUrl: mockUser.image,
        country: 'US',
        onboardingAt: null // Will trigger onboarding flow
      }

      const sessionData = {
        user: mockUser,
        profile: mockProfile
      }

      localStorage.setItem('cinely_session', JSON.stringify(sessionData))
      setUser(mockUser)
      setProfile(mockProfile)
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem('cinely_session')
    setUser(null)
    setProfile(null)
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
