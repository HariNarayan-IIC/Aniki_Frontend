import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import Roadmap_Section from './components/Roadmap_Section/Roadmap_Section.jsx';


let router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Roadmap_Section/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router= {router}/>
,
)
