import { useSelector } from 'react-redux'
import Layout from '../layout/Laoyout'
import style from '../css/authentication/Login.module.css'
import useCaptureData from '../hooks/useCaptureData'

export default function Login () {
  const { data, handleInputChange, handleSubmit } = useCaptureData()
  const { user, loading, error } = useSelector(state => state.auth)

  return (
    <Layout>
      <main className={style.container_login}>
        <section className={style.content_login}>
          <h1 className={style.title}>Create your profile</h1>
          <p>Join our community! Create your account now.</p>
        </section>

        <form className={style.form} onSubmit={handleSubmit}>
          <input type="text" value={data.name} name='name' onChange={handleInputChange} placeholder='Name' />
          <input type="email" value={data.email} name='email' onChange={handleInputChange} placeholder='Email' />
          <input type="password" value={data.password} name='password' onChange={handleInputChange} placeholder='Password' />
          <input type="number" value={data.age === 0 ? '' : data.age} name='age' onChange={handleInputChange} placeholder='Age' />
          <span className={style.spinner}>
            {error ? 
              <p className={style.error_input}>{error}</p> : null }
          </span>
          <span className={style.spinner}>
            {loading ? <p className={style.successful}>😁 {user.message || 'Register successful'}</p> : null}
          </span>
          <button className={style.buttom} type='submit'>{ loading ? 'Sending... ' : 'Send' }</button>
        </form>
      </main>
    </Layout>
  )
}
