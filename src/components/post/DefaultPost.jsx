import style from '../../css/post/Posts.module.css'
import Like from './Like'
import AddComments from './AddComments'

export default function DefaultPost ({ token, _id, idUser, imageProfile = null, name, body, imagePost = null ,like = [] }) {

  const hasLiked = like.some((setLike) => setLike.user === idUserx)

  return (
    <main className={style.container_post}>
      <section className={style.post}>
        <span>
          {
            imageProfile 
              ? <img className={style.image_profile} src={imageProfile} alt={`Profile photo of ${name}`} />
              : <img className={style.image_profile} src='/profile.webp' alt='Image example proflie' />
          }
        </span>
        <div className={style.flex_content}>
          <div className={style.content}>
            <h2>{name}</h2>             
            <p>{body}</p>
          </div>
          {
            imagePost
              ? <img className={style.image_post} src={imagePost} alt='Image upload for user'/>
              : null
          }
          <section className={style.container_interactions}>
            { token ? <Like postId={_id} statusLike={hasLiked} /> :null }
            { token ? <AddComments idPost={_id} /> : null }
          </section>
        </div>
      </section>
    </main>
  )
}