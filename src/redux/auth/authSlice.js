import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL_API, STATUS, DATA_USER, TOKEN } from '../../utils/contants.js'

const initialState = {
  user: DATA_USER || null,
  token: TOKEN || null,
  loading: false,
  error: null,
  status: null,
}

export const register = createAsyncThunk('@auth/register', async (userData, ThunkApi) => {
  try {
    const response = await axios.post(`${BASE_URL_API}/user/create`, userData)
    return response.data
  } catch (error) {
    const errorApi = error.response.data.message
    return ThunkApi.rejectWithValue(errorApi)
  }
})

export const login = createAsyncThunk('@auth/login', async (userData, ThunkApi) => {
  try {
    const response = await axios.post(`${BASE_URL_API}/user/login`, userData)
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', JSON.stringify(response.data.user.tokens[0]))
    }

    return response.data
  } catch (error) {
    const errorApi = error.response.data
    return ThunkApi.rejectWithValue(errorApi)
  }
})

export const logOut = createAsyncThunk('@auth/logout', async (userData, ThunkApi) => {
  try {
    const { _id, token } = userData
    const response = await axios.delete(`${BASE_URL_API}/user/logout/${_id}`, {
      headers: {
        authorization: token
      }})
    return response.data
  } catch (error) {
    const errorApi = error.response.data
    return ThunkApi.rejectWithValue(errorApi)
  }
}) 

export const uploadImage = createAsyncThunk('@auth/uploadimage', async (tokenUser, ThunkApi) => {
  try {
    const { token } = tokenUser

    const response = await axios.post(`${BASE_URL_API}/cloudinary/image/`, {
      headers: {
        authorization: token
      }
    })
    return response.data
  } catch (error) {
    const errorApi = error.response.data
    return ThunkApi.rejectWithValue(errorApi)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetStatusFulfilled(state) {
      state.status = STATUS.IDLE
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED
        state.user = action.payload
        state.loading = false
      })
      .addCase(register.pending, (state) => {
        state.status = STATUS.PENDING
        state.loading = true
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.status = STATUS.REJECTED
        state.loading = false
        state.error = action.payload || 'Please complete all fields on the form'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED
        state.user = action.payload
        state.token = action.payload.user.tokens
        state.loading = false
      })
      .addCase(login.pending, (state) => {
        state.status = STATUS.PENDING
        state.loading = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS.REJECTED
        state.loading = false
        state.error = action.payload || 'Please complete all fields on the form'
      })
      .addCase(logOut.fulfilled, (state) => {
        state.status = STATUS.FULFILLED
        state.user = localStorage.removeItem('user')
        state.token = localStorage.removeItem('token')
        state.loading = false
      })
      .addCase(logOut.pending, (state) => {
        state.status = STATUS.PENDING,
        state.loading = true
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = STATUS.REJECTED
        state.loading = false
        state.error = action.payload || '❌ error'
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.fulfilled = STATUS.FULFILLED
        state.loading = false
      })
  }
})

export const { resetStatusFulfilled  } = authSlice.actions

export default authSlice.reducer
