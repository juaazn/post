import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService.js'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null
}

export const register = createAsyncThunk('auth/register', async (user) => {
  return authService.register(user)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
      })
  }
})

export default authSlice.reducer
