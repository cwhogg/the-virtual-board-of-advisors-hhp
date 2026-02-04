import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const SITE_ID = process.env.SITE_ID || 'advisor-echo'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmails = await redis.lrange(`email_signups:${SITE_ID}`, 0, -1)
    if (existingEmails.includes(email)) {
      return NextResponse.json(
        { error: 'This email is already registered.' },
        { status: 400 }
      )
    }

    // Store email in list and increment counter
    await Promise.all([
      redis.rpush(`email_signups:${SITE_ID}`, email),
      redis.incr(`email_signups_count:${SITE_ID}`),
      // Store with timestamp for analytics
      redis.hset(`email_signup_details:${SITE_ID}`, {
        [email]: new Date().toISOString()
      })
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}