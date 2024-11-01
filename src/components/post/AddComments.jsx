import style from '../../css/post/addComments.module.css'
import useOpenDialog from '../../hooks/useOpenDialog'
import ButtonClose from '../Header/ButtonClose'
import { getPostId } from '../../redux/post/postSlice'
import { useSelector, useDispatch } from 'react-redux'


export default function AddComments ({ idPost }) {
  const { secondOpenDialog, handleSecondOpenDialog } = useOpenDialog()
  const { user } = useSelector(state => state.auth)
  const { postId } = useSelector(state => state.post)
  const dispatch = useDispatch()

  const handleOnClick = () => {
    handleSecondOpenDialog()
    dispatch(getPostId(idPost))
  }

  return (
    <>
      <button onClick={handleOnClick} type='button'>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100"><path fill="#022f43" d="m73 74.5-.5-.1-9.6-3.6a24.5 24.5 0 1 1 8-8l3.5 9.7a1.5 1.5 0 0 1-1.4 2zm-23-46A21.5 21.5 0 1 0 61.9 68c.3-.2.9-.3 1.3-.1l7.2 2.6-2.6-7.2c-.2-.4-.1-1 .1-1.3a21.5 21.5 0 0 0-18-33.3z"/></svg>
      </button>

      <dialog className={style.dialog} ref={secondOpenDialog}>
        <article className={style.container}>
          <ButtonClose close={handleSecondOpenDialog} />
          <section>
            <h2>{postId?.user.name}</h2>
            <p>{postId?.body}</p>
          </section>
        </article>
      </dialog>
    </>
  )
}
