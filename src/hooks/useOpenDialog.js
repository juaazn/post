import { useState, useRef } from 'react'

export default function useOpenDialog () {

  const [ open, setOpen ] = useState(false)
  const openDialog = useRef(null)
  const [ secondOpen, setSecondOpen ] = useState(false)
  const secondOpenDialog = useRef(null)

  const handleOpenDialog = () => {
    if (open) {
      openDialog.current.close();
      document.body.classList.remove('no_scroll')
    } else {
      openDialog.current.showModal()
      document.body.classList.add('no_scroll')
    }
    setOpen(!open)
  }

  const handleSecondOpenDialog = () => {
    if (secondOpen) {
      secondOpenDialog.current.close() 
      document.body.classList.remove('no_scroll')
    } else {
      secondOpenDialog.current.showModal()
      document.body.classList.add('no_scroll')
    }
    setSecondOpen(!secondOpen)
  }

  return {
    openDialog,
    handleOpenDialog,
    secondOpenDialog,
    handleSecondOpenDialog
  }
}