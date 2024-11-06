import style from '../../css/post/like.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, dislikePost } from '../../redux/post/postSlice'

export default function Like({ postId, statusLike }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  const [hasLiked, setHasLiked] = useState(statusLike)

  useEffect(() => {
    setHasLiked(statusLike);
  }, [statusLike])

  const handleLike = (event) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch(likePost({ postId, isLike: true, token }))
    setHasLiked(true)
  }

  const handleDislike = (event) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch(dislikePost({ postId, token }))
    setHasLiked(false)
  }

  return (
    <>
      {
        hasLiked
          ? (
            <button className={style.like} onClick={handleDislike} type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="red" stroke="red" viewBox="0 0 225.371 225.371"><path d="M159.933 12.904c-26.386 0-40.36 12.722-47.313 22.892-6.944-10.17-20.897-22.892-47.228-22.892C33.897 12.904 0 33.865 0 79.887c0 18.138 3.938 32.532 13.166 48.132 8.983 15.184 28.006 33.897 56.541 55.622 11.137 8.479 21.396 15.612 28.042 20.103 12.771 8.631 13.271 8.72 14.814 8.721.078.002.153.003.228.003 1.459 0 2.464-.465 14.673-8.675 6.65-4.473 16.918-11.579 28.065-20.039 28.57-21.681 47.646-40.433 56.699-55.734 9.212-15.571 13.143-29.967 13.143-48.132 0-46.023-33.921-66.984-65.438-66.984z"/></svg>
            </button>)
          : (
            <button className={style.like} onClick={handleLike} type="submit">
              <svg xmlns="http://www1.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24"><path fill="#022f43" d="m8.9617 18.9109.4643-.589-.4643.589ZM12 5.5006l-.5404.5201a.75.75 0 0 0 1.0808 0L12 5.5007Zm3.0383 13.4103.4643.589-.4643-.589Zm-5.6122-.589c-1.5157-1.1948-3.173-2.3616-4.4878-3.8421C3.6493 13.0282 2.75 11.3345 2.75 9.1371h-1.5c0 2.6655 1.1105 4.699 2.5667 6.3387 1.4305 1.6108 3.254 2.8994 4.6807 4.0241l.9286-1.178ZM2.75 9.1371c0-2.1509 1.2154-3.9546 2.8744-4.713 1.6117-.7366 3.7773-.5415 5.8352 1.5966l1.0808-1.0402C10.0985 2.4435 7.2641 2.0254 5.0008 3.06 2.7848 4.073 1.25 6.425 1.25 9.137h1.5Zm5.7474 10.3628c.5122.4038 1.0621.8344 1.6194 1.16.5571.3255 1.1928.5901 1.8832.5901v-1.5c-.3096 0-.6739-.1207-1.1264-.3852-.4523-.2643-.9215-.6282-1.4475-1.0429l-.9287 1.178Zm7.0052 0c1.4266-1.1247 3.2502-2.4133 4.6807-4.0241 1.4562-1.6397 2.5667-3.6732 2.5667-6.3387h-1.5c0 2.1974-.8992 3.8911-2.1883 5.3427-1.3148 1.4805-2.9721 2.6473-4.4877 3.8421l.9286 1.178ZM22.75 9.1371c0-2.712-1.5347-5.0642-3.7508-6.0771-2.2633-1.0346-5.0977-.6165-7.5396 1.9205l1.0808 1.0402c2.0579-2.1381 4.2235-2.3332 5.8352-1.5965 1.659.7583 2.8744 2.562 2.8744 4.7129h1.5Zm-8.176 9.1848c-.5261.4147-.9953.7786-1.4476 1.0429-.4525.2645-.8168.3852-1.1264.3852v1.5c.6904 0 1.3261-.2646 1.8832-.5901.5573-.3256 1.1071-.7562 1.6194-1.16l-.9286-1.178Z"/></svg>
            </button>
          )
      }
    </>
  )
}
