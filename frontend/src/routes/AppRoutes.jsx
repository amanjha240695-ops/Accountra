import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Feedback from "../pages/Feedback/Feedback";
import AllCalculators from "../pages/AllCalculators/AllCalculator";
import NotFound from "../pages/NotFound/NotFound";


// auth
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";


// Layout
import CalculatorLayout from "../layouts/CalculatorLayout/CalculatorLayout";


// Calculator imports
import GST from "../calculators/GST/GST";
import Billing from "../calculators/Billing/Billing";
import BalanceSheet from "../calculators/BalanceSheet/BalanceSheet";
import EMI from "../calculators/EMI/EMI";
import Loan from "../calculators/Loan/Loan";
import Interest from "../calculators/Interest/Interest";
import SIP from "../calculators/SIP/SIP";
import Salary from "../calculators/Salary/Salary";
import TDS from "../calculators/TDS/TDS";
import IncomeTax from "../calculators/IncomeTax/IncomeTax";
import Depreciation from "../calculators/Depreciation/Depreciation";
import ProfitLoss from "../calculators/ProfitLoss/ProfitLoss";
import Percentage from "../calculators/Percentage/Percentage";


// Admin
import AdminRoute from "../admin/AdminRoute";
import AdminLayout from "../admin/AdminLayout";

import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import FeedbackAdmin from "../admin/Feedback";
import Settings from "../admin/Settings";



const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>


        {/* =====================
            MAIN PAGES
        ====================== */}

        <Route 
          path="/" 
          element={<Home />} 
        />


        <Route 
          path="/about" 
          element={<About />} 
        />


        <Route 
          path="/calculators" 
          element={<AllCalculators />} 
        />


        <Route 
          path="/feedback" 
          element={<Feedback />} 
        />



        {/* =====================
            AUTH
        ====================== */}


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />




        {/* =====================
            CALCULATORS
        ====================== */}


        <Route
          path="/calculators/gst"
          element={
            <CalculatorLayout>
              <GST />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/emi"
          element={
            <CalculatorLayout>
              <EMI />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/loan"
          element={
            <CalculatorLayout>
              <Loan />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/interest"
          element={
            <CalculatorLayout>
              <Interest />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/percentage"
          element={
            <CalculatorLayout>
              <Percentage />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/sip"
          element={
            <CalculatorLayout>
              <SIP />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/discount"
          element={
            <CalculatorLayout>
              <SIP />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/salary"
          element={
            <CalculatorLayout>
              <Salary />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/tds"
          element={
            <CalculatorLayout>
              <TDS />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/income-tax"
          element={
            <CalculatorLayout>
              <IncomeTax />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/depreciation"
          element={
            <CalculatorLayout>
              <Depreciation />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/profit-loss"
          element={
            <CalculatorLayout>
              <ProfitLoss />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/balancesheet"
          element={
            <CalculatorLayout>
              <BalanceSheet />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/balance-sheet"
          element={
            <CalculatorLayout>
              <BalanceSheet />
            </CalculatorLayout>
          }
        />


        <Route
          path="/calculators/billing"
          element={
            <CalculatorLayout>
              <Billing />
            </CalculatorLayout>
          }
        />




        {/* =====================
            ADMIN PANEL
        ====================== */}


        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />


          <Route
            path="users"
            element={<Users />}
          />


          <Route
            path="feedback"
            element={<FeedbackAdmin />}
          />


          <Route
            path="settings"
            element={<Settings />}
          />


        </Route>




        {/* =====================
            404
        ====================== */}


        <Route
          path="*"
          element={<NotFound />}
        />


      </Routes>


    </BrowserRouter>

  );

};


export default AppRoutes;