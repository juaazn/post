import { useState } from 'react'

export default function useHandleAddPhoto () {
  const [ image, setImage ] = useState(null)

  const handleAddPhotoChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setImage({
        file: file,
        preview: URL.createObjectURL(file)
      })
    }    
  }

  return {
    image,
    handleAddPhotoChange
  }
}
