import style from '../../css/post/SpinnerHomeLoading.module.css'

export default function LoadingPost () {
  return (
    <div className={style.container}>
      <span>
        <article className={style.container_post}>
          <header className={style.header}>
            <picture className={style.photo}></picture>
            <h2 className={style.title}></h2>
          </header>
          <section className={style.body}></section>
          <footer className={style.footer}></footer>
        </article>
      </span>
      <span>
        <article className={style.container_post}>
          <header className={style.header}>
            <picture className={style.photo}></picture>
            <h2 className={style.title}></h2>
          </header>
          <section className={style.body}></section>
          <footer className={style.footer}></footer>
        </article>
      </span>
      <span>
        <article className={style.container_post}>
          <header className={style.header}>
            <picture className={style.photo}></picture>
            <h2 className={style.title}></h2>
          </header>
          <section className={style.body}></section>
          <footer className={style.footer}></footer>
        </article>
      </span>
    </div>    
  )
}