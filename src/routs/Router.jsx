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
import LoansCollectionPage from '../pages/lone/LoansCollectionPage';
import TodayInstallments from '../pages/lone/TodayInstallments';
import OverdueInstallments from '../pages/lone/OverdueInstallments';
import CloseLoansPage from '../pages/lone/CloseLoansPage';
import LoanApplicationForm from '../pages/lone/LoanApplicationForm';
import MembersPage from '../pages/members/MembersPage';
import MemberList from '../pages/members/MemberList';
import DpsCalculator from '../pages/dps/DpsCalculator';
import DpsSchemeCreate from '../pages/dps/DpsSchemeCreate';
import AllDpsSchemes from '../pages/dps/AllDpsSchemes';
import DpsSettingPage from '../pages/dps/DpsSettingPage';
import DpsCollectionPage from '../pages/dps/DpsCollectionPage';
import AllDpsCollections from '../pages/dps/AllDpsCollections';
import DpsManagement from '../pages/dps/DpsManagement';
import TodaysDps from '../pages/dps/TodaysDps';
import DailyDpsReport from '../pages/dps/DailyDpsReport';
import DpsReport from '../pages/dps/DpsReport';
import FdrCalculator from '../pages/fdr/FdrCalculator';
import FdrCreate from '../pages/fdr/FdrCreate';
import FdrSettingForm from '../pages/fdr/FdrSettingForm';
import FdrCollectionReport from '../pages/fdr/FdrCollectionReport';
import FdrManagement from '../pages/fdr/FdrManagement';
import TodaysFdrReport from '../pages/fdr/TodaysFdrReport';
import FdrTransactionReport from '../pages/fdr/FdrTransactionReport';
import OtherIncomeExpensePage from '../pages/joma-khoroch/OtherIncomeExpensePage';
import ExpenseCategoryPage from '../pages/joma-khoroch/ExpenseCategoryPage';
import InitialCashPage from '../pages/joma-khoroch/InitialCashPage';
import DailyCollectionReport from '../pages/somiti-maintain/DailyCollectionReport';
import DailyTransactionReport from '../pages/somiti-maintain/DailyTransactionReport';





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
                //Loans
              { path: "/dashboard/loan-create", element: <LoanForm /> },
              { path: "/dashboard/loan-savings-collection", element: <LoanSavingCollectionForm /> },
              { path: "/dashboard/all-loans", element: <AllLoans /> },
              { path: "/dashboard/loan-installment-collection", element: <LoanCollection /> },
              { path: "/dashboard/all-loan-installments", element: <LoansCollectionPage /> },
              { path: "/dashboard/today-installment", element: <TodayInstallments /> },
              { path: "/dashboard/expire", element: <OverdueInstallments /> },
              { path: "/dashboard/close-loan", element: <CloseLoansPage/> },
              { path: "/dashboard/loan-application", element: <LoanApplicationForm/> },
              //members
              { path: "/dashboard/member-create", element: <CreateMember /> },
              { path: "/dashboard/member-info", element: <MembersPage /> },
              { path: "/dashboard/member-list", element: <MemberList /> },
              //DPS
              { path: "/dashboard/dps-calculator", element: <DpsCalculator /> },
              { path: "/dashboard/dps-scheme-create", element: <DpsSchemeCreate /> },
              { path: "/dashboard/all-dps-schemes", element: <AllDpsSchemes /> },
              { path: "/dashboard/dps-scheme-settings", element: <DpsSettingPage /> },
              { path: "/dashboard/dps-collection", element: <DpsCollectionPage /> },
              { path: "/dashboard/all-dps-collection", element: <AllDpsCollections /> },
              { path: "/dashboard/dps-management", element: <DpsManagement /> },
              { path: "/dashboard/dps-today", element: <TodaysDps /> },
              { path: "/dashboard/dps-daily-collection-report", element: <DailyDpsReport /> },
              { path: "/dashboard/dps-member-report", element: <DpsReport /> },
              //FDR
              { path: "/dashboard/fdr-calculator", element: <FdrCalculator /> },
              { path: "/dashboard/fdr-scheme-create", element: <FdrCreate /> },
              { path: "/dashboard/fdr-settings", element: <FdrSettingForm /> },
              { path: "/dashboard/all-fdr", element: <FdrCollectionReport/> },
              { path: "/dashboard/fdr-management", element: <FdrManagement/> },
              { path: "/dashboard/fdr-collection-report", element: <TodaysFdrReport /> },
              { path: "/dashboard/fdr-deposit-withdraw-report", element: <FdrTransactionReport /> },
                //অন্যান্য আয়-ব্যয়ের খাত
              { path: "/dashboard/other-income-expense", element: <OtherIncomeExpensePage /> },
              { path: "/dashboard/expense-head-management", element: <ExpenseCategoryPage /> },
              { path: "/dashboard/opening-cash", element: <InitialCashPage /> },
              //সমিতি ব্যবস্থাপনা রিপোর্ট
              { path: "/dashboard/daily-collection-report", element: <DailyCollectionReport /> },
              { path: "/dashboard/daily-transaction-report", element: <DailyTransactionReport/> },
              
              
            ],
          },
        {
            path:"*",
            element:<Error></Error>
        }

]
)

export default router;