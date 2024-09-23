import { getPost } from '../../redux/post/postSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import SpinnerPost from './SpinnerPost'
import style from '../../css/post/Posts.module.css'

export default function Posts () {
  const dispatch = useDispatch()
  const { post } = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPost())
  }, [])

  return (
    <main className={style.container_post}>
      <SpinnerPost />
      <article>
        { 
          post && post.map(items => (
            <section className={style.post} key={items._id}>
              <h2>{items.title}</h2>
              <p>{items.body}</p>
              <img src={items.image.path} alt={items.title}/>
            </section>
          )) 
        }
      </article>
    </main>
  )
}
