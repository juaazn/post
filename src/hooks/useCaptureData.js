import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, login, resetStatusFulfilled } from '../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { STATUS } from '../utils/contants'

export default function useCaptureData (authAction = 'register') {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.auth)
  const [data, setData] = useState({ name: '', email: '', password: '', age: 0 })
  const navigate = useNavigate()
  const initialState = authAction === 'register' 
    ? {  name: '', email: '', password: '', age: 0} 
    : { email: '', password: '' }

  const clearState = () => {
    setData({ ...initialState })
  }

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (authAction === 'register') {
      await dispatch(register(data))
    } else if (authAction === 'login') {
      await dispatch(login(data))
    }
  }

  useEffect(() => {
    if (status === STATUS.FULFILLED) {
      if (authAction === 'register') {
        navigate('/login');
      } else if (authAction === 'login') {
        navigate('/');
      }
      dispatch(resetStatusFulfilled())
      clearState()
    }
  }, [status, authAction, navigate, dispatch])

  return {
    data,
    handleInputChange,
    handleSubmit
  }
}
