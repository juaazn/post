import { Link } from 'react-router-dom'
import style from '../../css/authentication/ButtomRegister.module.css'

export default function ButtonLogin () {
  return <Link className={style.buttom} to='/resgister'>Create on account</Link>
}