import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'


let router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <></>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router= {router}/>
,
)
