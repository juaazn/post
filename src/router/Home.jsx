import Layout from '../layout/Laoyout'
import Posts from '../components/post/Posts'
import AddPost from '../components/post/AddPost'

export default function Home () {
  return (
    <>
      <Layout>
        <Posts />
        <AddPost />
      </Layout>
    </>
  )
}