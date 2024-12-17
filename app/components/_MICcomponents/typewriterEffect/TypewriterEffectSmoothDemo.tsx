'use client'
import { TypewriterEffectSmooth } from './typeWriterEffect'
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: 'Welcome'
    },
    {
      text: 'onboard'
    },
    {
      text: 'with'
    },

    {
      text: 'Us !',
      className: 'text-primary dark:text-primary'
    }
  ]
  return <TypewriterEffectSmooth className='text-3xl' words={words} />
}
