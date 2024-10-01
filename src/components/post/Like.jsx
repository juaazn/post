import style from '../../css/post/like.module.css'
import { useDispatch } from 'react-redux'

export default function Like () {
  const dispatch = useDispatch()

  const handleLikeSubmit = () => {
    dispatch()
  }

  return (
    <button className={style.like} onClick={handleLikeSubmit} type="submit">
      <svg width="64" height="64" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg"><path d="M1.2 8.2 8 15l6.8-6.8c.8-.8 1.2-1.8 1.2-3v-.1a4 4 0 0 0-7.2-2.6l-.8 1-.8-1A4 4 0 0 0 0 5.1v.1c0 1.2.4 2.2 1.2 3Z" fill="#000"/></svg>
    </button>
  )
}
