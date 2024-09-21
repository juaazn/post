import { Link } from 'react-router-dom'
import styles from '../../css/header/Header.module.css'
import MenuHamburguer from './MenuHamburguer'

export default function () {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} to='/'>Post</Link>
      <MenuHamburguer />
      <Link to='/login'>Login</Link>
    </header>
  )
}
