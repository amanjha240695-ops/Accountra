import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Feedback from "../pages/Feedback/Feedback";
import AllCalculators from "../pages/AllCalculators/AllCalculator";
import NotFound from "../pages/NotFound/NotFound";

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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/calculators" element={<AllCalculators />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Calculator Pages */}

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

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;