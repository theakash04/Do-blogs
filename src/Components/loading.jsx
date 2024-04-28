import React from 'react'

function Loading() {
  return (
    <div className='w-screen h-screen flex absolute bg-black/30 backdrop-blur-sm z-50'>
      <div className='w-12 h-12 border-4 border-solid border-transparent border-t-4 border-t-blue-500 rounded-full m-auto animate-spin' />
    </div>
  )
}

export default Loading
