import style from '../../css/authentication/Login.module.css'

export default function SpinnerAuth ({ user, loading, error }) {
  return (
    <span className={style.spinner}>
      {error ? <p className={style.error_input}>{error?.message || error }</p> : null }
      {loading ? <p className={style.successful}>😁 {user?.message || 'successful'}</p> : null}
    </span>
  )
}