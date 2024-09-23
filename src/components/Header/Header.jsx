import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../../css/header/Header.module.css'
import MenuHamburguer from './MenuHamburguer'

export default function () {
  const { token } = useSelector(state => state.auth)

  return (
    <header className={styles.container}>
      <Link className={styles.logo} to='/'>Post</Link>
      { token && <MenuHamburguer /> }
      { !token && <Link className={styles.buttom_login} to='/login'>Login</Link> }
    </header>
  )
}
