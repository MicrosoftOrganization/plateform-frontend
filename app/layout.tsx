import { Inter } from 'next/font/google'
// import ScrollTop from './components/scrolltop/ScrollTop'
import { Analytics } from '@vercel/analytics/react'
import { NextUIProvider } from '@nextui-org/react'


import '@/app/global.css'
import ToasterProvider from '@/app/components/Hot-Toast/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Microsoft Issatso Club',
  description: 'Microsoft Issatso Club'
}

export default function RootLayout({ children }) {
  return (
    <html
      style={{
        scrollBehavior: 'smooth',
        backgroundColor: '#DCE4E4', 
      }}
      lang='en'
    >
      <body className={inter.className }>
        <NextUIProvider>
          {children}
          <ToasterProvider />
        </NextUIProvider>
        {/* <ScrollTop /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
