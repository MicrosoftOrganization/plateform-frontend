import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster
      position='top-center'
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: 'green',
            color: 'white'
          }
        },
        error: {
          style: {
            background: 'red',
            color: 'white'
          }
        }
      }}
    />
  )
}
