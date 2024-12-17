import Image from 'next/image'
import Logo from '@/public/images/big-logo.png'
import 'react-circular-progressbar/dist/styles.css'
import '@/app/global.css'
import LoginForm from '@/mic-component/loginUI/LoginForm'
export default function Login() {
  return (
    <main className='login-background w-screen' >
      <div className='m-4 flex h-auto w-full items-center justify-center rounded-2xl border border-primary bg-gradient-to-r from-secondary to-primary shadow-2xl md:m-20 md:h-[40rem] md:w-2/3'>
        <div className='relative grid h-full w-full grid-cols-1 items-center justify-center py-10 md:grid-cols-2'>
          <svg
            className='blob blob1 hidden md:block'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='#0B6363'
              d='M44,-37.2C57,-18.9,67.2,-0.6,66.1,19.3C64.9,39.2,52.2,60.7,33.4,70.1C14.5,79.5,-10.6,76.8,-26.8,65.3C-43,53.8,-50.2,33.5,-53.4,13.8C-56.6,-5.8,-55.7,-24.8,-46.1,-42.3C-36.6,-59.9,-18.3,-76.1,-1.4,-75C15.6,-73.9,31.1,-55.6,44,-37.2Z'
              transform='translate(100 100)'
            />
          </svg>
          <svg
            className='blob blob2 hidden md:block'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='#FFFFFF'
              d='M56.2,-43.4C64,-35.1,55.2,-12.3,48.1,7.7C40.9,27.7,35.3,44.8,22.2,54.2C9.1,63.5,-11.6,65.2,-23.2,56.5C-34.9,47.7,-37.6,28.4,-40,11.1C-42.3,-6.2,-44.4,-21.6,-37.6,-29.6C-30.9,-37.6,-15.5,-38.3,4.4,-41.8C24.2,-45.3,48.5,-51.6,56.2,-43.4Z'
              transform='translate(100 100)'
            />
          </svg>
          <svg
            className='blob blob3 hidden md:block'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='#002121'
              d='M58.7,-44.3C67.3,-35.9,59.6,-12,54.1,12.4C48.5,36.8,45.1,61.7,33.1,66.7C21.1,71.7,0.5,56.8,-21.4,45.7C-43.2,34.7,-66.3,27.6,-69,15.8C-71.7,4,-54,-12.5,-39.1,-22.3C-24.2,-32.1,-12.1,-35.2,6.5,-40.4C25,-45.5,50,-52.7,58.7,-44.3Z'
              transform='translate(100 100)'
            />
          </svg>
          <div className='z-10 flex hidden text-white md:block'>
            <div className='logo absolute left-4 top-4'>
              <Image src={Logo} alt='Logo' width={100} height={100} />
            </div>
            <div className='text-center'>
              <h1 className='mb-4 text-4xl font-bold'>
                We Are Glad That You Are Joining Us! 
              </h1>
              <p className='text-lg font-thin'>
                Together we'll be creating an impact that matters
              </p>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
