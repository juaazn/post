import { useState, useRef } from 'react'

export default function useOpenDialog () {

  const [ open, setOpen ] = useState(false)
  const openDialog = useRef(null)
  const [ secondOpen, setSecondOpen ] = useState(false)
  const secondOpenDialog = useRef(null)

  const handleOpenDialog = () => {
    open 
      ? openDialog.current.close() 
      : openDialog.current.showModal()
    setOpen(!open)
  }

  const handleSecondOpenDialog = () => {
    secondOpen
      ? secondOpenDialog.current.close() 
      : secondOpenDialog.current.showModal()
      setSecondOpen(!secondOpen)
  }

  return {
    openDialog,
    handleOpenDialog,
    secondOpenDialog,
    handleSecondOpenDialog
  }
}