import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

interface DecodedToken {
  role?: string
}

export function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get('token')?.value
  // console.log('Token:', token) // Debugging line
  if (!token || typeof token !== 'string') return false

  try {
    const secretKey = process.env.JWT_SECRET
    if (!secretKey) {
      throw new Error('JWT secret key is missing')
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    jwtVerify(token, secret)
    return true
  } catch (error) {
    console.error('Token verification failed:', error)
    return false
  }
}

export async function getUserRole(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get('token')?.value
  // console.log('Token:', token) // Debugging line
  if (!token || typeof token !== 'string') return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = (await jwtVerify(token, secret)) as {
      payload: DecodedToken
    }

    // console.log('payload.role'+payload.role) // Debugging line
    return payload.role || null
  } catch (error) {
    console.error('Token decoding failed:', error)
    return null
  }
}
