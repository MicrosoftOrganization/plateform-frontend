import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // Define default options
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
        error: {
          duration: 5000,
          theme: {
            primary: 'red',
            secondary: 'black',
          },
          
        },
      }}
    />
  )
}

