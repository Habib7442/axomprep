'use server'

import { createClient } from '@supabase/supabase-js'

// Create a Supabase client with the service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function createUserProfile(
  userId: string,
  email: string,
  username: string,
  firstName: string | null,
  lastName: string | null,
  exam: string | null
) {
  try {
    // Randomly assign a Hogwarts house
    const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']
    const randomHouse = houses[Math.floor(Math.random() * houses.length)]

    const { error } = await supabaseAdmin
      .from('users')
      .insert([
        {
          id: userId,
          email,
          username,
          first_name: firstName,
          last_name: lastName,
          exam,
          house: randomHouse,
          xp: 0,
          level: 1
        }
      ])

    if (error) {
      console.error('Error creating user profile:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Unexpected error creating user profile:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
