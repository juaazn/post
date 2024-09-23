import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import style from '../../css/header/MenuHamburguer.module.css'

export default function MenuHamburguer () {
  const [ modal, setModal ] = useState(false)
  const dialogRef = useRef(null)
  const prueba = null

  const handleOpne = () => {
    modal 
      ? dialogRef.current.close()
      : dialogRef.current.showModal()

    setModal(!modal)
  }

  return (
    <>
    <dialog ref={dialogRef} className={style.open_dialog}>
      <button type='button' onClick={handleOpne}>Cerrar</button>
      <ul>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <button type='button'>Log out</button>
        </li>
      </ul>
    </dialog>
    <button className={style.profile} type='button' onClick={handleOpne}><img className={style.image} src='/profile.webp' alt='Image example proflie' /></button>
    </>
  )
}
