import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated, getUserRole } from '@/utils/Auth'

const protectedRoutes = {
  member: ['/member','/member/assignments', '/member/sessions'],
  instructor: [
    '/instructor/assignments',
    '/instructor/sessions',
    '/instructor/create',
    '/instructor/chats',
    '/instructor/responses',
    '/instructor/showMembers'
  ],
  admin: [
    '/superAdmin/home',
    '/superAdmin/departments',
    'superAdmin/Instrutors'
  ]
}

export default async function middleware(req: NextRequest) {
  const isAuth = isAuthenticated(req)
  const userRole = isAuth ? await getUserRole(req) : null
  const { pathname } = req.nextUrl

  // console.log('Middleware executed')
  // console.log('isAuth:', isAuth)
  // console.log('userRole:', userRole)
  // console.log('pathname:', pathname)

  // Redirect authenticated users away from the login page
  if (isAuth && pathname === '/') {
    return NextResponse.redirect(new URL(`/${userRole}/assignments`, req.nextUrl.origin))
  }

  // Redirect unauthorized users to the "Unauthorized" page
  if (isAuth) {
    if (protectedRoutes.member.includes(pathname) && userRole !== 'member') {
      return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin))
    }
    if (
      protectedRoutes.instructor.includes(pathname) &&
      userRole !== 'instructor'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin))
    }
    if (
      protectedRoutes.admin.includes(pathname) &&
      userRole !== 'superAdmin'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin))
    }
  }
  

  return NextResponse.next()
}
