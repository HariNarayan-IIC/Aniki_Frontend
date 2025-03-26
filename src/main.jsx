import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import SignupPage from './SignupPage.jsx';
import LandingPage from './LandingPage.jsx';
import DashboardPage from './DashboardPage.jsx';


let router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "signup",
        element: <SignupPage/>
      },
      {
        path: "",
        element: <LandingPage/>
      },
      {
        path: "dashboard",
        element: <DashboardPage/>
      }
    ]
  }
  
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router= {router}/>
,
)
