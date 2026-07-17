import CalculatorCard from "../CalculatorCard/CalculatorCard";

import "./PopularCalculators.css";

const PopularCalculators = () => {
  return (
    <section className="popular">

      <h2>Popular Calculators</h2>

      <p>
        Quick access to the most frequently used accounting calculators.
      </p>

      <div className="calculator-grid">

      <CalculatorCard
  icon="📊"
  title="GST Calculator"
  description="Calculate GST instantly."
  path="/calculators/gst"
/>

<CalculatorCard
  icon="💰"
  title="EMI Calculator"
  description="Know your monthly EMI."
  path="/calculators/emi"
/>

<CalculatorCard
  icon="📈"
  title="Income Tax"
  description="Estimate your income tax."
  path="/calculators/income-tax"
/>

<CalculatorCard
  icon="🏦"
  title="Loan Calculator"
  description="Calculate loan payments."
  path="/calculators/loan"
/>

<CalculatorCard
  icon="💼"
  title="Salary Calculator"
  description="Calculate salary structure."
  path="/calculators/salary"
/>

<CalculatorCard
  icon="🧾"
  title="TDS Calculator"
  description="Calculate TDS deductions."
  path="/calculators/tds"
/>
<CalculatorCard icon="📉" title="SIP Calculator" description="Plan your investments." path="/calculators/sip" />


      </div>

    </section>
  );
};

export default PopularCalculators;