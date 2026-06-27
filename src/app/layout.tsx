import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prakhar — Software Engineer',
  description:
    'Software engineer with 2+ years of experience in Java, Spring Boot, and scalable backend systems. Currently at Morgan Stanley.',
  keywords: ['software engineer', 'Java', 'Spring Boot', 'Kafka', 'Elasticsearch', 'backend', 'Mumbai'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
