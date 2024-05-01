import React from 'react'
import { Button } from '@mui/material'

function ButtonJS({children, variant,...props}) {
  return (
    <Button className='' {...props} variant='contained'>
      {children}
    </Button>
  )
}

export default ButtonJS
