import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './router/Home'
import Profile from './router/Profile'
import Login from './router/Login.jsx'
import Register from './router/Register.jsx'
import Post from './router/Post.jsx'
import './layout.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/resgister',
    element: <Register />
  },
  {
    path: '/post/:user/:_id',
    element: <Post />
  }
], { basename: '/' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
