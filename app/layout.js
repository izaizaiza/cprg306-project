import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './features/nav-bar'
import { ArtProvider } from './features/art-context'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Art Roam',
  description: 'Bringing art pieces from different museums together in one place',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='m-10 {inter.className}'>
        <ArtProvider>
          <main>
            <NavBar />
            {children}
          </main>
        </ArtProvider>
      </body>
    </html>
  )
}
