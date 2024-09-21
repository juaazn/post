import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/auth/authSlice'
import { STATUS } from '../utils/contants.js'

export default function useCaptureData () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status } = useSelector(state =>  state.auth)
  const [data, setData] = useState({ name: '', email: '', password: '', age: 0 })
  const initialState = {
    name: '',
    email: '',
    password: '',
    age: 0
  }

  const clearState = () => {
    setData({ ...initialState })
  }

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit= (event) => {
    event.preventDefault()
    dispatch(register(data))
    clearState()
  }

  useEffect(() => {
    if (status === STATUS.PENDING) {
      navigate('/login') 
    }
  }, [status])

  return {
    data,
    handleInputChange,
    handleSubmit
  }
}
