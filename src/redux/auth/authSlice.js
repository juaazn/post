import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL_API, STATUS } from '../../utils/contants.js'

const initialState = {
  user: null,
  token: null,
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
      localStorage.setItem('token', JSON.stringify(response.data.token))
    }

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
        state.token = action.payload.token
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
  }
})

export const { resetStatusFulfilled  } = authSlice.actions

export default authSlice.reducer
