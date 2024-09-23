import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL_API, STATUS } from '../../utils/contants'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  post: null,
  loading: false,
  error: null,
  status: null,
}

export const getPost = createAsyncThunk('@post/get', async (ThunkApi) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/post/getAll`)
    return response.data
  } catch (error) {
    const errorApi = error.response.data
    return ThunkApi.rejectWithValue(errorApi)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED
        state.post = action.payload
        state.loading = false
      })
      .addCase(getPost.pending, (state) => {
        state.status = STATUS.PENDING
        state.loading = true
        state.error = null
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status = STATUS.REJECTED
        state.loading = false
        state.error = action.payload || 'Please complete all fields on the form'
      })
  }
})

export const {  } = postSlice.actions
export default postSlice.reducer
