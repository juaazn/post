import { getPost } from '../../redux/post/postSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import SpinnerPost from './SpinnerPost'
import style from '../../css/post/Posts.module.css'
import Like from './Like'
import AddComments from './AddComments'

export default function Posts () {
  const dispatch = useDispatch()
  const { post } = useSelector(state => state.post)
  const { user, token } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getPost())
  }, [])

  return (
    <main className={style.container_post}>
      <SpinnerPost />
      <article>
          {
          post && post.slice().reverse().map((items) => {
            const hasLiked = items.like.some((like) => like.user === user?._id)
            
            return (
              <section className={style.post} key={items._id}>
                <span>
                  {
                    items.user.profileImage 
                      ? <img className={style.image_profile} src={items.user?.profileImage?.url} alt={`Profile photo of ${items.user.name}`} />
                      : <img className={style.image_profile} src='/profile.webp' alt='Image example proflie' />
                  }
                </span>
                <div className={style.flex_content}>
                  <div className={style.content}>
                    <h2>{items.user.name}</h2>             
                    <p>{items.body}</p>
                  </div>
                  <img className={style.image_post} src={items.image?.path} alt={items.title}/>
                  <section className={style.container_interactions}>
                    { token ? <Like postId={items._id} statusLike={hasLiked} /> :null }
                    { token ? <AddComments idPost={items._id} /> : null }
                  </section>
                </div>
              </section>
            )
          })
        }
      </article>
    </main>
  )
}
