import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../redux/auth/authSlice'

export default function useCaptureData () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
    setTimeout(() => {
      navigate('/login')
    }, 500)
  }

  return {
    data,
    handleInputChange,
    handleSubmit
  }
}
