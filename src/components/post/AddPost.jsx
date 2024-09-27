import style from '../../css/post/AddPost.module.css'
import ButtonClose from '../Header/ButtonClose'
import useOpenDialog from '../../hooks/useOpenDialog'
import { useRef } from 'react'

export default function AddPost () {
  const { secondOpenDialog, handleSecondOpenDialog } = useOpenDialog()
  const textarea = useRef('')

  const handleTextAreaHeightChange = (event) => {
    textarea.current.style.height = 'auto'
    let scHeight = event.target.scrollHeight
    textarea.current.style.height = `${scHeight}px`
  }

  return (
    <>
      <dialog className={style.tag_dialog} ref={secondOpenDialog}>
        <section className={style.container_dialog}>
          <ButtonClose close={handleSecondOpenDialog} />
          <form>
            <textarea ref={textarea} onKeyUpCapture={handleTextAreaHeightChange} className={style.textarea} name="body" placeholder="What's new?"></textarea>
          </form>
        </section>
      </dialog>
      <button className={style.button} onClick={handleSecondOpenDialog} type="button">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M28 12h-8V4a4 4 0 1 0-8 0v8H4a4 4 0 1 0 0 8h8v8a4 4 0 1 0 8 0v-8h8a4 4 0 1 0 0-8" fill="#fff"/></svg>
      </button>
    </>
  )
}