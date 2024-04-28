import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Account, AddPost, EditPost, ErrorPage, Home, Login, SignUp, ViewPost } from './Pages/Page.js'
import {AuthLayout} from './Components/components.js'
import { Provider } from 'react-redux'
import store from './Store/store.js'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/addPost",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signUp",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout authentication={false}>
            < ViewPost/>
          </AuthLayout>
        )
      },
      {
        path: "/user/:userName",
        element: (
          <AuthLayout authentication>
            <Account />
          </AuthLayout>
        )
      },
      {
        path: "/editPost/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "*",
        element: <ErrorPage />,
        
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
