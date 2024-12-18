import React from 'react'
import Lottie from 'react-lottie'
import animationData from '@/public/lottie-animations/empty.json'
function Empty(){
  return (
    <div className='items-'>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        height={400}
        width={400}
      />
    </div>
  )
}

export default Empty