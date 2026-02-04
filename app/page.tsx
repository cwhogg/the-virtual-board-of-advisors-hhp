'use client'

import { useState } from 'react'
import JsonLd from '../components/content/JsonLd'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Advisor Echo",
    "description": "AI-powered voice conversations with thought leader personas for growth-oriented professionals",
    "url": typeof window !== 'undefined' ? window.location.origin : 'https://advisorecho.com'
  }

  return (
    <>
      <JsonLd schema={organizationSchema} />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8">
                <span className="badge-primary">Early Access</span>
              </div>
              
              <h1 className="prose h1 mb-6">
                Don't lose coaching momentum between sessions
              </h1>
              
              <p className="text-xl text-text-secondary mb-12 leading-relaxed">
                Voice conversations with AI-powered thought leader personas help you apply frameworks, process insights, and maintain growth velocity when your coach isn't available.
              </p>
              
              <div className="mx-auto max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === 'loading'}
                      className="input"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full"
                  >
                    {status === 'loading' ? 'Joining...' : 'Join Early Access'}
                  </button>
                  
                  {status === 'success' && (
                    <p className="text-green-400 text-sm">
                      ✓ You're on the list! We'll notify you when early access opens.
                    </p>
                  )}
                  
                  {status === 'error' && (
                    <p className="text-red-400 text-sm">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="prose h2 mb-4">
                Keep the momentum going
              </h2>
              <p className="text-lg text-text-secondary">
                Bridge the gap between sessions with thought leader insights, available whenever clarity calls.
              </p>
            </div>
            
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="card text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    Bridge the coaching gap
                  </h3>
                  <p className="text-text-secondary">
                    Continue applying frameworks and processing breakthroughs between your scheduled coaching sessions with on-demand voice guidance.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    Multiple advisor perspectives
                  </h3>
                  <p className="text-text-secondary">
                    Access diverse thought leader personas calibrated to their actual frameworks and speaking patterns for richer decision-making support.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    Voice-first reflection
                  </h3>
                  <p className="text-text-secondary">
                    Think through complex challenges naturally with conversational AI that understands both emotional check-ins and strategic frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="prose h2 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  What are the 5 C's in coaching?
                </h3>
                <p className="text-text-secondary">
                  The 5 C's of coaching are: Clarity (understanding goals), Commitment (dedication to change), Competence (building skills), Confidence (self-belief), and Connection (relationship building). Advisor Echo helps you maintain momentum on all these elements between your coaching sessions.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  What are the 3 C's of coaching?
                </h3>
                <p className="text-text-secondary">
                  The 3 C's focus on: Clarity (clear vision and goals), Choice (exploring options and decisions), and Change (taking action and implementing). Our AI personas help you work through these core coaching elements with voice-based conversations whenever you need support.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  What is the 70 30 rule in coaching?
                </h3>
                <p className="text-text-secondary">
                  The 70-30 rule suggests that 70% of coaching should involve asking questions and listening, while 30% involves providing guidance and advice. Advisor Echo's AI personas are designed with this principle in mind, primarily asking thought-provoking questions to help you discover your own insights.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  What are the 5 R's of coaching?
                </h3>
                <p className="text-text-secondary">
                  The 5 R's are: Rapport (building trust), Reality (understanding current situation), Responsibility (taking ownership), Resources (identifying strengths and tools), and Results (achieving outcomes). Advisor Echo helps you continue working through these areas between sessions with your human coach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <div className="card">
              <h2 className="prose h2 mb-4">
                Your breakthrough doesn't pause when your coaching session ends
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Join our early access list to be among the first to maintain your coaching momentum with AI-powered thought leader conversations.
              </p>
              
              <div className="mx-auto max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    className="input"
                  />
                  
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full"
                  >
                    {status === 'loading' ? 'Joining...' : 'Join Early Access'}
                  </button>
                  
                  {status === 'success' && (
                    <p className="text-green-400 text-sm">
                      ✓ You're on the list! We'll notify you when early access opens.
                    </p>
                  )}
                  
                  {status === 'error' && (
                    <p className="text-red-400 text-sm">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}