import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import SignupPage from './pages/SignupPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import RoadmapsCataloguePage from './pages/RoadmapsCataloguePage.jsx';
import RoadmapPage from './pages/RoadmapPage.jsx';
import PageNotFound from './pages/404Page.jsx';
import OTPVerificationPage from './pages/OTPVerificationPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import AdminOnlyRoute from './utils/AdminOnlyRoute.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import AdminRoadmapEditor from './pages/RoadmapEditorPage.jsx';
import { ReactFlowProvider } from 'reactflow';
import { SocketProvider } from './context/SocketContext.jsx';
import ChatRoomsCataloguePage from './pages/CommCataloguePage.jsx';
import ChatRoomPage from './pages/ChatRoomPage.jsx'
import RoadmapCreator from './components/RoadmapCreater.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><SocketProvider><App/></SocketProvider></AuthProvider>,
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
        element: <RoadmapsCataloguePage/>
      },
      {
        path: "roadmap/:id",
        element: <ReactFlowProvider><RoadmapPage /></ReactFlowProvider>
      },
      {
        path: "otpVerification",
        element: <OTPVerificationPage/>
      },
      {
        path: "adminPanel",
        element: <AdminOnlyRoute><AdminPanel/></AdminOnlyRoute>
      },
      {
        path: "roadmapCreater",
        element: <AdminOnlyRoute><RoadmapCreator/></AdminOnlyRoute>
      },
      {
        path: "roadmapEditor",
        element: <AdminOnlyRoute><ReactFlowProvider><AdminRoadmapEditor/></ReactFlowProvider></AdminOnlyRoute>
      },
      {
        path: "communities",
        element: <ChatRoomsCataloguePage/>
      },
      {
        path: "chatroom/:roomId",
        element: <ChatRoomPage/>
      },
      {
        path: "*",
        element: <PageNotFound/>
      },
      
    ]
  }
  
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router= {router}/>
,
)
