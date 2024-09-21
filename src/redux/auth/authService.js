import axios from 'axios'
import { BASE_URL_API } from '../../utils/contants.js'

async function register (userData) {
  try {
    const res = await axios.post(`${BASE_URL_API}/user/create`, userData)
    if (!res) throw new Error(`Error data authService ${res}: response create user rejectes`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

async function login () {
  try {
    const res = await axios.post(`${BASE_URL_API}/user/login`)
    if (!res.data) throw new Error(`Error data authService ${res}: response login user rejectes`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const authService = {
  register,
  login
}

export default authService
