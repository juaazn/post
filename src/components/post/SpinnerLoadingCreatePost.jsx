import style from '../../css/post/SpinnerCreatePost.module.css'
import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetStatusPublished } from '../../redux/post/postSlice'

export default function SpinnerLoadingCreatePost () {
  const { published } = useSelector(state => state.post)
  const dispatch = useDispatch()
  const dialog = useRef(null)

  useEffect(() => {
    if (published) {
      dialog.current.showModal()
    }

    setTimeout(() => {
      dispatch(resetStatusPublished())
    }, 1500)
  }, [published])

  return (
    <>
      {
        published && (
        <dialog className={style.dialog} ref={dialog}>
          <span className={style.container_publish}>
            <p className={style.message}><strong>{published}</strong></p>
          </span>
        </dialog>)
      }
    </>
  )
}
