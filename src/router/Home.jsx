import Layout from '../layout/Laoyout'
import Posts from '../components/post/Posts'
import style from '../css/home/Home.module.css'

export default function Home () {
  return (
    <>
      <Layout>
        <Posts />
      </Layout>
    </>
  )
}