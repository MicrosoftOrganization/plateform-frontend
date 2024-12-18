import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='rounded-lg bg-white p-8 text-center shadow-lg'>
        <h1 className='mb-4 text-6xl font-bold text-red-600'>404</h1>
        <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
          Page Not Found
        </h2>
        <p className='mb-6 text-lg text-gray-700'>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href='/'>
          <p className='inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-MIC'>
            Go to Homepage
          </p>
        </Link>
      </div>
    </div>
  )
}
