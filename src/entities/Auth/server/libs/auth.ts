 
import NextAuth from 'next-auth'

import { authConfig } from './auth.config'

export const authOptions = {
  ...authConfig,
} as any

export const { handlers: AuthHandlers, auth, signIn, signOut } = NextAuth(authOptions) as any
