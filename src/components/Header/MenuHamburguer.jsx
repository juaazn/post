import style from '../../css/header/MenuHamburguer.module.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut, resetStatusFulfilled, uploadImage } from '../../redux/auth/authSlice'
import { STATUS } from '../../utils/contants'
import useOpenDialog from '../../hooks/useOpenDialog'
import ButtonClose from './ButtonClose'

export default function MenuHamburguer () {
  const { user, token, status,loading, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { openDialog, handleOpenDialog, secondOpenDialog, handleSecondOpenDialog } = useOpenDialog()
  const [selectedImage, setSelectedImage] = useState(null);

  const submitUploadImage = (e) => {
    e.preventDefault()

    if (!selectedImage || !selectedImage.file) return;

    const formData = new FormData()
    formData.append('picture', selectedImage?.file)
    formData.append('token', token)

    dispatch(uploadImage({ formData: formData ,token: token }))
    dispatch(resetStatusFulfilled())
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setSelectedImage({
        file: file,
        preview: URL.createObjectURL(file)
      })
    }
  }

  const handleLogOut = (userData) => {
    dispatch(logOut(userData))
    dispatch(resetStatusFulfilled())
  }

  return (
    <>
    <dialog ref={openDialog} className={style.dialog}>
      <div className={style.open_dialog}>
        <nav className={style.nav}>
          <ButtonClose close={handleOpenDialog}/>
          <picture className={style.container_photo}>
            {
              user.profileImage 
              ? <img  className={style.image_menu} src={user.profileImage.url} alt={`Photo profile of ${user.name}`} />
              : <img className={style.image_menu} src='/profile.webp' alt='Image example proflie' />
            }
            <button className={style.add_photo} onClick={handleSecondOpenDialog}><img src='/add-photo.svg' alt='Button add photo' /></button>
          </picture>
          <dialog className={style.container_dialog_photo} ref={secondOpenDialog}>
            <div className={style.flex_photo}>
              <section className={style.dialog_photo}>
                <ButtonClose close={handleSecondOpenDialog}/>
                {
                  selectedImage 
                    ? <img className={style.image_selected} src={selectedImage?.preview} alt='image selected'/>
                    : <img className={style.image_selected} src='/profile.webp' alt='Image example proflie' />
                }
                <form className={style.form_upload_image} onSubmit={submitUploadImage}>
                  <input className={style.input_file} type='file' id='picture' accept="image/*" onChange={handleImageChange}/>
                  <input className={style.submit} type="submit" value='Submit' />
                  <span className={style.error}>
                    { error ? <p>{ error || 'Error upload image'}</p> : null }
                    { loading ? <p className={style.loading}>loading...</p> :null }
                    { status === STATUS.FULFILLED ? <p className={style.loading}>Done 🤘</p> :null }
                  </span>
                </form>
              </section>
            </div>
          </dialog>
          <p>Hey, { user ? user.name : "where is the name🙄" }</p>
          <div className={style.container_logout}>
            <button className={style.button_logout} type='button' onClick={() => handleLogOut({_id: user._id, token: token })}>Log out</button>
          </div>
        </nav>
      </div>
    </dialog>
    <button className={style.profile} type='button' onClick={handleOpenDialog}>
      {
        user.profileImage 
        ? <img  className={style.image} src={user.profileImage.url} alt={`Photo profile of ${user.name}`} />
        : <img className={style.image} src='/profile.webp' alt='Image example proflie' />
      }
    </button>
    </>
  )
}
