import React from 'react'
import { createBrowserRouter } from 'react-router'
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home';
import Error from '../pages/Error';
import DashboardLayout from '../layout/DashboardLayout';
import LoanForm from '../pages/lone/LoanForm ';
import LoanSavingCollectionForm from '../pages/lone/LoanSavingCollectionForm';
import AllLoans from '../pages/lone/AllLoans';
import LoanCollection from '../pages/lone/LoanCollection';
import CreateMember from '../pages/members/CreateMember';





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
            children: [
              { path: "/dashboard/loan-create", element: <LoanForm /> },
              { path: "/dashboard/loan-savings-collection", element: <LoanSavingCollectionForm /> },
              { path: "/dashboard/all-loans", element: <AllLoans /> },
              { path: "/dashboard/loan-installment-collection", element: <LoanCollection /> },
              { path: "/dashboard/member-create", element: <CreateMember /> },
            ],
          },
        {
            path:"*",
            element:<Error></Error>
        }

]
)

export default router;