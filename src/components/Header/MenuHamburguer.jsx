import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut,resetStatusFulfilled, uploadImage } from '../../redux/auth/authSlice'
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

  const handleUploadImage = () => {
    dispatch(uploadImage({ token: token }))
  }

  const handleLogOut = (userData) => {
    dispatch(logOut(userData))
    dispatch(resetStatusFulfilled())
  }

  return (
    <>
    <dialog ref={dialogRef} className={style.dialog}>
      <div className={style.open_dialog}>
        <nav className={style.nav}>
          <div className={style.flex_clouse_buttom}>
            <button className={style.close_button} type='button' onClick={handleOpne}>
              <img src="/close-buttom.svg" alt="" />
            </button>
          </div>
          <picture className={style.container_photo}>
            {
              user.profileImage 
              ? <img  className={style.image_menu} src={user.profileImage.path} alt={`Photo profile of ${user.name}`} />
              : <img className={style.image_menu} src='/profile.webp' alt='Image example proflie' />
            }
            <label className={style.add_photo}>
              <input onClick={handleUploadImage} type='file' id='picture' />
              <img src='/add-photo.svg' alt='Button add photo' />
            </label>
          </picture>
          <p>Hey, { user ? user.name : "where is the name🙄" }</p>
          <button className={style.button_logout} type='button' onClick={() => handleLogOut({_id: user._id, token: token })}>Log out</button>
        </nav>
      </div>
    </dialog>
    <button className={style.profile} type='button' onClick={handleOpne}>
      {
        user.profileImage 
        ? <img  className={style.image} src={user.profileImage.path} alt={`Photo profile of ${user.name}`} />
        : <img className={style.image} src='/profile.webp' alt='Image example proflie' />
      }
    </button>
    </>
  )
}
