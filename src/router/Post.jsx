import Layout from '../layout/Laoyout'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostId } from '../redux/post/postSlice'
import DefaultPost from '../components/post/DefaultPost'

export default function Post () {
  const { _id } = useParams()
  const { postId } = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPostId(_id))
  }, [])

  return (
    <Layout>
      <DefaultPost
        token={postId?.user?.tokens[0]}
        _id={_id}
        idUser={postId?.user?._id}
        imageProfile={postId?.user?.profileImage?.url}
        name={postId?.user?.name}
        body={postId?.body}
        imagePost={postId?.image?.path}
        like={postId?.like}
        comments={postId?.comments}
      />
    </Layout>
  )
}
