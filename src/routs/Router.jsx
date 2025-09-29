import React from 'react'
import { createBrowserRouter } from 'react-router'
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home';
import Error from '../pages/Error';




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
            path:"*",
            element:<Error></Error>
        }

]
)

export default router;