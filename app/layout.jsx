// import { Inter } from 'next/font/google'
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Directory',
  description: 'AI Directory',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className='full-body'>{children}</body>
    </html>
  )
}
