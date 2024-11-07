import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL_API, STATUS } from '../../utils/contants'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  post: [],
  postId: null,
  comment: null,
  loading: false,
  published: null,
  error: null,
  status: null,
  isLike: null
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

export const getPostId = createAsyncThunk('@post/getId', async (postId, ThunkApi) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/post/id/${postId}`)
    return response.data
  } catch (error) {
    const errorApi = error.response.data
    return ThunkApi.rejectWithValue(errorApi)
  }
})

export const createPost = createAsyncThunk('@post/create' , async (data, ThunkApi) => {
  try {
    const { body, token } = data
    const response = await axios.post(`${BASE_URL_API}/post/create/`, body , {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token
      }
    })
    return response.data
  } catch (error) {
    const errorApi = error.response.data
    return ThunkApi.rejectWithValue(errorApi)
  }
})

export const createComments = createAsyncThunk('@post/createComments', async (data, ThunkApi) => {
  try {
    const { idPost, body, token } = data
    const response = await axios.post(`${BASE_URL_API}/comments/create/${idPost}`, { body }, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })
    return response.data
  } catch (error) {
    const errorApi = error.response.data
    return ThunkApi.rejectWithValue(errorApi)
  }
})

export const likePost = createAsyncThunk('@post/like', async ({ postId, isLike, token }, ThunkApi) => {
  try {
    const response = await axios.post(`${BASE_URL_API}/post/like/${postId}`, { isLike },
      {
        headers: {
          authorization: token,
        },
      }
    )
    return response.data;
  } catch (error) {
    const errorApi = error.response.data;
    return ThunkApi.rejectWithValue(errorApi);
  }
})

export const dislikePost = createAsyncThunk('@post/dislike', async ({ postId, token }, ThunkApi) => {
  try {
    const response = await axios.put(`${BASE_URL_API}/post/deleteLike/${postId}`, {},
      {
        headers: {
        authorization: token,
        },
      })
    return response.data;
  } catch (error) {
    const errorApi = error.response.data;
    return ThunkApi.rejectWithValue(errorApi);
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    resetStatusPublished(state) {
      state.published = null
    }
  },
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
        state.error = action.payload
      })
      .addCase(getPostId.fulfilled , (state, action) => {
        state.status = STATUS.FULFILLED
        state.postId = action.payload
        state.loading = false
      })
      .addCase(getPostId.pending , (state, action) => {
        state.status = STATUS.PENDING
        state.loading = true
        state.error = null
      })
      .addCase(getPostId.rejected , (state, action) => {
        state.status = STATUS.REJECTED
        state.loading = false
        state.error = action.payload
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED
        state.published = action.payload.message
        state.loading = false
      })
      .addCase(createPost.pending, (state) => {
        state.status = STATUS.PENDING
        state.loading = true
        state.error = null
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = STATUS.REJECTED
        state.loading = false
        state.error = action.payload
      })
      .addCase(createComments.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED
        state.comment = action.payload
        state.loading = false
      })
      .addCase(createComments.pending, (state) => {
        state.status = STATUS.PENDING
        state.loading = true
        state.error = null
      })
      .addCase(createComments.rejected, (state, action) => {
        state.status = STATUS.REJECTED
        state.loading = false
        state.error = action.payload
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED
        const updatedPost = action.payload
        state.post = state.post.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED
        const updatedPost = action.payload
        state.post = state.post.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.payload;
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.payload;
      })
  }
})

export const { resetStatusPublished } = postSlice.actions
export default postSlice.reducer
