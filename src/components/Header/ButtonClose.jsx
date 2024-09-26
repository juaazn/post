import style from '../../css/header/MenuHamburguer.module.css'


export default function ButtonClose ({ close }) {
  return (
    <div className={style.flex_clouse_buttom}>
      <button className={style.close_button} type='button' onClick={close}>
        <img src="/close-buttom.svg" alt="Close button" />
      </button>
    </div>
  )
}
