import React from 'react'
import { createBrowserRouter } from 'react-router'
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home';
import Error from '../pages/Error';
import DashboardLayout from '../layout/DashboardLayout';




const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout></RootLayout>,
            children: [
                { 
                index: true, 
                element: <Home /> 
            },
            // {
            //     path:"/login",
            //     element:<Login></Login>
            // },
            // {
            //     path:"/register",
            //     element:<Register></Register>
            // },
            // {
            //     path:"/blog",
            //     element:<BlogPage></BlogPage>
            // },
            // {
            //     path:"/members",
            //     element:<MemberInfo></MemberInfo>
            // },
            
            ]
        },
        {
            path: "/dashboard",
            element: <DashboardLayout />,
            // children: [
            //   { path: "members", element: <Members /> },
            //   { path: "fees", element: <Fees /> },
            //   { path: "reports", element: <Reports /> },
            //   { path: "settings", element: <Settings /> },
            // ],
          },
        {
            path:"*",
            element:<Error></Error>
        }

]
)

export default router;