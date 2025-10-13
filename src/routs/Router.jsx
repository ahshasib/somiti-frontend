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
import MembersBalanceReport from '../pages/somiti-maintain/MembersBalanceReport';
import InstallmentProfitReport from '../pages/somiti-maintain/InstallmentProfitReport';
import PrivateRoute from '../privetRoute/PrivateRoute';
import Login from '../pages/login/Login';
import RoleBasedRoute from '../privetRoute/RoleBasedRoute';
import DashboardHome from '../component/DashboardHome';
import LoanReceipt from '../pages/lone/LoanReceipt';





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
            
            ]
        },
        {
          path:"/login",
          element:<Login></Login>

        },
        {
            path: "/dashboard",
            element: (
              <PrivateRoute>
              <DashboardLayout />
              </PrivateRoute>
            ),
            children: [
              { index: true, element: <DashboardHome /> },
                //Loans
              { path: "/dashboard/loan-create", element: (<RoleBasedRoute allowedRoles={["admin"]}><LoanForm /></RoleBasedRoute>) },
              { path: "/dashboard/loan-savings-collection", element: (<RoleBasedRoute allowedRoles={["admin",]}><LoanSavingCollectionForm /></RoleBasedRoute>) },
              { path: "/dashboard/all-loans", element:  (<RoleBasedRoute allowedRoles={["admin","member"]}><AllLoans /></RoleBasedRoute>)},
              { path: "/dashboard/loan-installment-collection", element:  (<RoleBasedRoute allowedRoles={["admin","agent"]}><LoanCollection /></RoleBasedRoute>)},
              { path: "/dashboard/all-loan-installments", element:  (<RoleBasedRoute allowedRoles={["admin"]}><LoansCollectionPage /></RoleBasedRoute>)},
              { path: "/dashboard/today-installment", element:  (<RoleBasedRoute allowedRoles={["admin","agent"]}><TodayInstallments /></RoleBasedRoute>)},
              { path: "/dashboard/expire", element:  (<RoleBasedRoute allowedRoles={["admin","agent"]}><OverdueInstallments /></RoleBasedRoute>)},
              { path: "/dashboard/close-loan", element: (<RoleBasedRoute allowedRoles={["admin"]}><CloseLoansPage/> </RoleBasedRoute>)},
              { path: "/dashboard/loan-application", element:  (<RoleBasedRoute allowedRoles={["admin"]}><LoanApplicationForm/></RoleBasedRoute>)},
              { path:"/dashboard/loan-receipt/:id" , element:  (<RoleBasedRoute allowedRoles={["admin"]}><LoanReceipt/></RoleBasedRoute>)},
              //members
              { path: "/dashboard/member-create", element:  (<RoleBasedRoute allowedRoles={["admin"]}><CreateMember /></RoleBasedRoute>)},
              { path: "/dashboard/member-info", element:  (<RoleBasedRoute allowedRoles={["admin"]}><MembersPage /></RoleBasedRoute>)},
              { path: "/dashboard/member-list", element:  (<RoleBasedRoute allowedRoles={["admin","member","agent"]}><MemberList /></RoleBasedRoute>)},
              //DPS
              { path: "/dashboard/dps-calculator", element:  (<RoleBasedRoute allowedRoles={["admin","member","agent"]}><DpsCalculator /></RoleBasedRoute>)},
              { path: "/dashboard/dps-scheme-create", element:  (<RoleBasedRoute allowedRoles={["admin"]}><DpsSchemeCreate /></RoleBasedRoute>)},
              { path: "/dashboard/all-dps-schemes", element:  (<RoleBasedRoute allowedRoles={["admin","agent"]}><AllDpsSchemes /></RoleBasedRoute>)},
              { path: "/dashboard/dps-scheme-settings", element:  (<RoleBasedRoute allowedRoles={["admin"]}><DpsSettingPage /></RoleBasedRoute>)},
              { path: "/dashboard/dps-collection", element:  (<RoleBasedRoute allowedRoles={["admin","agent"]}><DpsCollectionPage /></RoleBasedRoute>)},
              { path: "/dashboard/all-dps-collection", element:  (<RoleBasedRoute allowedRoles={["admin","agent"]}><AllDpsCollections /></RoleBasedRoute>)},
              { path: "/dashboard/dps-management", element:  (<RoleBasedRoute allowedRoles={["admin"]}><DpsManagement /></RoleBasedRoute>)},
              { path: "/dashboard/dps-today", element:  (<RoleBasedRoute allowedRoles={["admin"]}><TodaysDps /></RoleBasedRoute>)},
              { path: "/dashboard/dps-daily-collection-report", element:  (<RoleBasedRoute allowedRoles={["admin"]}><DailyDpsReport /></RoleBasedRoute>)},
              { path: "/dashboard/dps-member-report", element:  (<RoleBasedRoute allowedRoles={["admin"]}><DpsReport /></RoleBasedRoute>)},
              //FDR
              { path: "/dashboard/fdr-calculator", element:  (<RoleBasedRoute allowedRoles={["admin","member"]}><FdrCalculator /></RoleBasedRoute>)},
              { path: "/dashboard/fdr-scheme-create", element:  (<RoleBasedRoute allowedRoles={["admin"]}><FdrCreate /></RoleBasedRoute>)},
              { path: "/dashboard/fdr-settings", element:  (<RoleBasedRoute allowedRoles={["admin"]}><FdrSettingForm /></RoleBasedRoute>)},
              { path: "/dashboard/all-fdr", element:  (<RoleBasedRoute allowedRoles={["admin"]}><FdrCollectionReport/></RoleBasedRoute>)},
              { path: "/dashboard/fdr-management", element:  (<RoleBasedRoute allowedRoles={["admin"]}><FdrManagement/></RoleBasedRoute>)},
              { path: "/dashboard/fdr-collection-report", element:  (<RoleBasedRoute allowedRoles={["admin"]}><TodaysFdrReport /></RoleBasedRoute>)},
              { path: "/dashboard/fdr-deposit-withdraw-report", element:  (<RoleBasedRoute allowedRoles={["admin"]}><FdrTransactionReport /></RoleBasedRoute>)},
                //অন্যান্য আয়-ব্যয়ের খাত
              { path: "/dashboard/other-income-expense", element:  (<RoleBasedRoute allowedRoles={["admin"]}><OtherIncomeExpensePage /></RoleBasedRoute>)},
              { path: "/dashboard/expense-head-management", element:  (<RoleBasedRoute allowedRoles={["admin"]}><ExpenseCategoryPage /></RoleBasedRoute>)},
              { path: "/dashboard/opening-cash", element:  (<RoleBasedRoute allowedRoles={["admin"]}><InitialCashPage /></RoleBasedRoute>)},
              //সমিতি ব্যবস্থাপনা রিপোর্ট
              { path: "/dashboard/daily-collection-report", element:  (<RoleBasedRoute allowedRoles={["admin"]}><DailyCollectionReport /></RoleBasedRoute>)},
              { path: "/dashboard/daily-transaction-report", element:  (<RoleBasedRoute allowedRoles={["admin"]}><DailyTransactionReport/></RoleBasedRoute>)},
              { path: "/dashboard/member-balance-report", element:  (<RoleBasedRoute allowedRoles={["admin"]}><MembersBalanceReport/></RoleBasedRoute>)},
              { path: "/dashboard/dividend-report", element:  (<RoleBasedRoute allowedRoles={["admin"]}><InstallmentProfitReport/></RoleBasedRoute>)},
              
              
            ],
          },
        {
            path:"*",
            element:<Error></Error>
        }

]
)

export default router;