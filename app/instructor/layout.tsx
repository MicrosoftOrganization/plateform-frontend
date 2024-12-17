import Navbar from '@/mic-component/navbar/navbar'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className='z--10 flex min-h-screen w-screen flex-col items-center justify-center rounded-md bg-gradient-to-b from-secondary to-primary bg-cover bg-center'>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default Layout
