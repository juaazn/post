import style from '../../css/post/addComments.module.css'
import useOpenDialog from '../../hooks/useOpenDialog'
import ButtonClose from '../Header/ButtonClose'
import { useState, useRef } from 'react'
import { getPostId } from '../../redux/post/postSlice'
import { useSelector, useDispatch } from 'react-redux'


export default function AddComments ({ idPost }) {
  const { secondOpenDialog, handleSecondOpenDialog } = useOpenDialog()
  const { user } = useSelector(state => state.auth)
  const { postId } = useSelector(state => state.post)
  const textarea = useRef('')
  const [ text, setText ] = useState({text: ''})
  const dispatch = useDispatch()

  const handleOnClick = () => {
    handleSecondOpenDialog()
    dispatch(getPostId(idPost))
  }

  const handleTextAreaHeightChange = (event) => {
    textarea.current.style.height = 'auto'
    let scHeight = event.target.scrollHeight
    textarea.current.style.height = `${scHeight}px`

    setText({ ...text, [event.target.name]: event.target.value })
  }

  return (
    <>
      <button onClick={handleOnClick} type='button'>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100"><path fill="#022f43" d="m73 74.5-.5-.1-9.6-3.6a24.5 24.5 0 1 1 8-8l3.5 9.7a1.5 1.5 0 0 1-1.4 2zm-23-46A21.5 21.5 0 1 0 61.9 68c.3-.2.9-.3 1.3-.1l7.2 2.6-2.6-7.2c-.2-.4-.1-1 .1-1.3a21.5 21.5 0 0 0-18-33.3z"/></svg>
      </button>

      <dialog className={style.dialog} ref={secondOpenDialog}>
        <article className={style.container}>
          <ButtonClose close={handleSecondOpenDialog} />
          <section className={style.post}>
            {
              postId?.user.profileImage
                ? <img className={style.image_profile} src={postId?.user?.profileImage?.url} />
                : <img className={style.image_profile} src="/profile.webp" alt="Photo profile" />
            }
            <div>
              <h2>{postId?.user.name}</h2>
              <p>{postId?.body}</p>
              { postId?.image ? <img className={style.image_post} src={postId?.image?.path} /> : null }
            </div>
          </section>
          <section className={style.add_comments}>
            <picture className={style.replay_comment}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="33" fill="none" className={style.svg_comment}><path fill="#000" d="M2 1a1 1 0 0 0-2 0h2Zm24 26-10-5.8v11.6L26 27ZM0 1v18h2V1H0Zm9 27h8v-2H9v2Zm-9-9c0 5 4 9 9 9v-2a7 7 0 0 1-7-7H0Z"/></svg>
            </picture>
            {
              user?.profileImage
                ? <img className={style.image_profile} src={user?.profileImage?.url} alt='User profile' />
                : <img className={style.image_profile} src='/profile.webp' alt='User profile'/>
            }
            <textarea ref={textarea} onKeyUpCapture={handleTextAreaHeightChange} name="comment" className={style.add_comment} placeholder={`Replay to ${user?.name}`}></textarea>
          </section>
        </article>
      </dialog>
    </>
  )
}
