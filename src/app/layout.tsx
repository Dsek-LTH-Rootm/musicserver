import { SettingOutlined } from '@ant-design/icons';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Music server',
  description: 'Non-commercial music server to allow multiple people control 1 spotify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="sm:*:text-3xl font-mono m-4 w-screen *:text-sm min-[340px]:*:text-xl flex items-end fixed top-0">
          <Link href="/" className="hover:text-gray-400">Music server</Link>
          <Link href="/admin" className="hover:text-gray-400 ml-8 self-center"><SettingOutlined /></Link>
          <Link href="/login" className="hover:text-gray-400 absolute right-0 mr-8">Login</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
