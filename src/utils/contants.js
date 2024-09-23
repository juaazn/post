export const BASE_URL_API = 'https://mongodb-social-media.vercel.app/api'
export const STATUS = {IDLE: null,FULFILLED : 'fulfilled',PENDING: 'pending',REJECTED: 'rejected'}
export const DATA_USER = JSON.parse(localStorage?.getItem('user'))
export const TOKEN = JSON.parse(localStorage?.getItem('token'))