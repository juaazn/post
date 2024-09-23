import { useSelector } from 'react-redux'
import style from '../../css/post/SpinnerHomeLoading.module.css'

export default function SpinnerPost () {
  const { loading } = useSelector(state => state.post)

  return (
    <>
      { loading ? <p className={style.spinner}>Loading post...</p> : null }
    </>
  )
}
