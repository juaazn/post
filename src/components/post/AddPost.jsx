import style from '../../css/post/AddPost.module.css'
import ButtonClose from '../Header/ButtonClose'
import useOpenDialog from '../../hooks/useOpenDialog'
import useHandleAddPhoto from '../../hooks/useHandleAddPhoto'
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPost, getPost } from '../../redux/post/postSlice'
import SpinnerLoadingCreatePost from './SpinnerLoadingCreatePost'

export default function AddPost () {
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { secondOpenDialog, handleSecondOpenDialog } = useOpenDialog()
  const { image, handleAddPhotoChange } = useHandleAddPhoto()
  const textarea = useRef('')
  const [ text, setText ] = useState({text: ''})

  const handleTextAreaHeightChange = (event) => {
    textarea.current.style.height = 'auto'
    let scHeight = event.target.scrollHeight
    textarea.current.style.height = `${scHeight}px`

    setText({ ...text, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!text.text) return;

    const formData = new FormData()

    formData.append('picture', image?.file)
    formData.append('body', text.text)
    formData.append('token', token)

    dispatch(createPost({ body: formData, token: token }))
    dispatch(getPost())
    setText({})
    handleSecondOpenDialog()
  }

  return (
    <>
      {
        token && (
        <>
          <dialog className={style.tag_dialog} ref={secondOpenDialog}>
            <section className={style.container_dialog}>
              <ButtonClose close={handleSecondOpenDialog} />
              <form onSubmit={handleSubmit} className={style.flex_add_post}>
                <textarea ref={textarea} onKeyUpCapture={handleTextAreaHeightChange} className={style.textarea} name="text" placeholder="What's new?"></textarea>
                <div className={style.flex_button}>
                  <label className={style.add_photo} type='button'>
                    <input type="file" id='picture' onChange={handleAddPhotoChange} />
                    <img src="/add-photo.svg" alt="add post" />
                  </label>
                  <input type="submit" className={style.submit} value='Public'/>
                </div>
              </form>
              <picture>
                { image && (<img src={image?.preview} alt="Image select upload" className={style.picture} />) }
              </picture>
            </section>
          </dialog>
          <SpinnerLoadingCreatePost  />
          <button className={style.button} onClick={handleSecondOpenDialog} type="button">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M28 12h-8V4a4 4 0 1 0-8 0v8H4a4 4 0 1 0 0 8h8v8a4 4 0 1 0 8 0v-8h8a4 4 0 1 0 0-8" fill="#fff"/></svg>
          </button>
        </>)
      }
    </>
  )
}