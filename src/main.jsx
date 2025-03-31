import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import SignupPage from './SignupPage.jsx';
import LandingPage from './LandingPage.jsx';
import RoadmapsPage from './RoadmapsPage.jsx';

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
        path: "/roadmaps",
        element: <RoadmapsPage/>
      }
    ]
  }
  
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router= {router}/>
,
)
