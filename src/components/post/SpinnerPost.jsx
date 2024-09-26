import { useSelector } from 'react-redux'
import LoadingPost from './LoadingPost'

export default function SpinnerPost () {
  const { loading } = useSelector(state => state.post)

  return (
    <>
      { loading ? <LoadingPost /> : null }
    </>
  )
}
