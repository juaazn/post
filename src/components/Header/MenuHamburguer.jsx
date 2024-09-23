import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut,resetStatusFulfilled } from '../../redux/auth/authSlice'
import { Link } from 'react-router-dom'
import style from '../../css/header/MenuHamburguer.module.css'

export default function MenuHamburguer () {
  const { user, token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [ modal, setModal ] = useState(false)
  const dialogRef = useRef(null)

  const handleOpne = () => {
    modal 
      ? dialogRef.current.close()
      : dialogRef.current.showModal()

    setModal(!modal)
  }

  const handleLogOut = (userData) => {
    dispatch(logOut(userData))
    dispatch(resetStatusFulfilled())
  }

  return (
    <>
    <dialog ref={dialogRef} className={style.open_dialog}>
      <button type='button' onClick={handleOpne}>Cerrar</button>
      <p>Hey, {user.name}</p>
      <ul>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <button type='button' onClick={() => handleLogOut({_id: user._id, token: token })}>Log out</button>
        </li>
      </ul>
    </dialog>
    <button className={style.profile} type='button' onClick={handleOpne}><img className={style.image} src='/profile.webp' alt='Image example proflie' /></button>
    </>
  )
}
