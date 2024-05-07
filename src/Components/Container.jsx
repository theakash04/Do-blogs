import React from 'react'

function Container({children, className}) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}

export default Container
