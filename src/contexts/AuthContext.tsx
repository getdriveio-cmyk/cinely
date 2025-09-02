import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

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
  const { 
    user: auth0User, 
    loginWithRedirect, 
    logout, 
    isLoading: auth0Loading,
    isAuthenticated
  } = useAuth0()
  
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (auth0User && isAuthenticated) {
      // Convert Auth0 user to our User interface
      const convertedUser: User = {
        id: auth0User.sub || '',
        name: auth0User.name || auth0User.email || 'User',
        email: auth0User.email || '',
        image: auth0User.picture,
      }
      
      const convertedProfile: UserProfile = {
        userId: convertedUser.id,
        displayName: convertedUser.name,
        avatarUrl: convertedUser.image,
        country: 'US', // Default country
        onboardingAt: null // Will trigger onboarding flow
      }
      
      setUser(convertedUser)
      setProfile(convertedProfile)
      console.log('Auth0 user signed in:', convertedUser)
    } else {
      setUser(null)
      setProfile(null)
    }
  }, [auth0User, isAuthenticated])

  const signIn = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin,
          appState: {
            returnTo: '/dashboard'
          }
        },
      })
    } catch (error) {
      console.error('Auth0 login error:', error)
    }
  }

  const signOut = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
    setUser(null)
    setProfile(null)
    console.log('Auth0 user signed out')
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
    isLoading: auth0Loading,
    isAuthenticated,
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
