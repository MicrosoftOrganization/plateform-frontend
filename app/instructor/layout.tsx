import Navbar from '@/mic-component/navbar/navbar'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className='flex min-h-screen w-screen flex-col items-center justify-center p-10'>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default Layout
