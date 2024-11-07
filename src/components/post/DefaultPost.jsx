import style from '../../css/post/Posts.module.css'
import Like from './Like'
import AddComments from './AddComments'

export default function DefaultPost ({ token, _id, idUser, imageProfile = null, name, body, imagePost = null , like = [], comments = [] }) {

  const hasLiked = like.some((setLike) => setLike.user === idUser)

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
      {
        comments && comments.map(comment => (
          <section className={style.comment} key={comment?._id}>
            <div className={style.content_comment}>
              {
                comment?.userId?.profileImage
                  ? <img className={style.image_profile} src={comment?.userId?.profileImage?.url} alt='Image Profile'/>
                  : <img className={style.image_profile} src="/profile.webp" alt="Image Profile" />
              }
              <div>
                <h2>{comment?.userId?.name}</h2>
                <p>{comment?.body}</p>
              </div>
            </div>
          </section>
      ))
      }
    </main>
  )
}