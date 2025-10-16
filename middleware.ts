import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/companions(.*)',
  '/interviews(.*)',
  '/subscription(.*)',
  '/settings(.*)',
  '/my-journey(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
    
    // For authenticated users, ensure they have a trial record
    const { userId } = await auth()
    if (userId) {
      // Try to initialize trial for the user
      try {
        // Import and call the trial initialization function
        const { initializeUserTrial } = await import('@/lib/actions/trial.actions')
        await initializeUserTrial()
      } catch (error) {
        console.error("Error initializing trial in middleware:", error)
      }
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}