import { useSelector } from 'react-redux'
import Layout from '../layout/Laoyout'
import ButtonLogin from '../components/authentication/ButtomCreateUser'
import style from '../css/authentication/Login.module.css'
import useCaptureData from '../hooks/useCaptureData'
import SpinnerAuth from '../components/authentication/SpinnerAuth'

export default function Login () {
  const { data, handleInputChange, handleSubmit } = useCaptureData('login')
  const { user, loading, error } = useSelector(state => state.auth)

  return (
    <Layout>  
      <main className={style.container_login}>
        <section className={style.content_login}>
          <h1 className={style.title}>Welcome Back</h1>
          <p>Experience a world of possibilities. Log in and connect with the community.</p>
        </section>

        <form className={style.form} onSubmit={handleSubmit}>
          <input value={data.email} onChange={handleInputChange} name='email' type="email" placeholder='Email' />
          <input value={data.password} onChange={handleInputChange} name='password' type="password" placeholder='Contraseña' />
          <SpinnerAuth user={user} loading={loading} error={error} />
          <button className={style.buttom} type='submit'>{loading ? 'logging in' : 'Log In'}</button>
        </form>

        <ButtonLogin />
      </main>
    </Layout>
  )
}
