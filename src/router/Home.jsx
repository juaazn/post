import Layout from '../layout/Laoyout'
import style from '../css/home/Home.module.css'

export default function Home () {
  return (
    <>
      <Layout>
        <h1 className={style.title}>Ultimos post</h1>
      </Layout>
    </>
  )
}