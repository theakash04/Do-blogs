import React from 'react'
import './Verify.css'


function LoadingPage({text = "Getting Page Ready"}) {
  return (
    <div className='flex flex-col items-center gap-7 w-full h-screen justify-center'>
      <div className='loader2' />
      <div className='font-bold text-2xl text-center px-5'>
        {text}
      </div>
    </div>
  )
}

export default LoadingPage 
