import React from 'react'
import PostCards from './PostCards'

function Posts() {
  return (
    <div className='w-full flex items-center justify-center flex-col sm:grid sm:grid-cols-2 sm:place-items-center pt-5 gap-3 sm:px-20 px-2'>
      <PostCards />
      <PostCards />
      <PostCards />
      <PostCards />
      <PostCards />
    </div>
  )
}

export default Posts


//do stylng for card grid
