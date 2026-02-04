import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Advisor Echo - Your coaching momentum between sessions',
  description: 'Advisor Echo provides between coaching sessions support through AI-powered voice conversations with thought leader personas for growth-oriented professionals.',
  keywords: 'between coaching sessions support, AI coaching companion, voice-based reflection app, coaching accountability, multi-advisor consultation AI, thought leader AI personas, coaching momentum maintenance',
  authors: [{ name: 'Advisor Echo' }],
  creator: 'Advisor Echo',
  publisher: 'Advisor Echo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://advisorecho.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Advisor Echo - Your coaching momentum between sessions',
    description: 'Don\'t lose coaching momentum between sessions. Voice conversations with AI-powered thought leader personas help you apply frameworks and process insights.',
    siteName: 'Advisor Echo'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advisor Echo - Your coaching momentum between sessions',
    description: 'Don\'t lose coaching momentum between sessions. Voice conversations with AI-powered thought leader personas help you apply frameworks and process insights.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased bg-background text-text-primary">
        {children}
      </body>
    </html>
  )
}