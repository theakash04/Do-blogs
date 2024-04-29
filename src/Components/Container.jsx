import React from 'react'

function Container({children, style}) {
  return (
    <div className={`w-full flex items-center justify-center ${style}`}>
      {children}
    </div>
  )
}

export default Container
