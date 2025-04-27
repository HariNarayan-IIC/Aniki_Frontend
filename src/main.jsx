import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import SignupPage from './SignupPage.jsx';
import LandingPage from './LandingPage.jsx';
import DashboardPage from './DashboardPage.jsx';

import RoadmapsPage from './RoadmapsPage.jsx';
import PageNotFound from './404Page.jsx';
import OTPVerificationPage from './OTPVerificationPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><App/></AuthProvider>,
    children: [
      {
        path: "signup",
        element: <SignupPage/>
      },
      {
        path: "login",
        element: <SignupPage/>
      },
      {
        path: "",
        element: <LandingPage/>
      },
      {
        path: "dashboard",
        element: <ProtectedRoute><DashboardPage/></ProtectedRoute> 
      },
      {
        path: "roadmaps",
        element: <RoadmapsPage/>
      },
      {
        path: "otpVerification",
        element: <OTPVerificationPage/>
      },
      {
        path: "*",
        element: <PageNotFound/>
      }
    ]
  }
  
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router= {router}/>
,
)
