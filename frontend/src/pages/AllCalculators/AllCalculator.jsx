import CalculatorCard from "../../components/CalculatorCard/CalculatorCard";

const calculators = [
  {
    title: "GST Calculator",
    description: "Calculate GST amount instantly.",
    path: "/calculators/GST",
  },
  {
    title: "Income Tax Calculator",
    description: "Estimate your income tax.",
    path: "/calculators/income-tax",
  },
  {
    title: "EMI Calculator",
    description: "Monthly EMI calculation.",
    path: "/calculators/emi",
  },
  {
    title: "Loan Calculator",
    description: "Calculate loan repayments.",
    path: "/calculators/loan",
  },
  {
    title: "Interest Calculator",
    description: "Simple & Compound Interest.",
    path: "/calculators/interest",
  },
  {
    title: "SIP Calculator",
    description: "Plan your investments.",
    path: "/calculators/SIP",
  },
 
  {
    title: "Salary Calculator",
    description: "Estimate salary breakdown.",
    path: "/calculators/salary",
  },
  {
    title: "TDS Calculator",
    description: "Calculate TDS deductions.",
    path: "/calculators/tds",
  },
  {
    title: "Depreciation Calculator",
    description: "Calculate asset depreciation.",
    path: "/calculators/depreciation",
  },
  {
    title: "Balance Sheet Calculator",
    description: "Generate balance sheet report.",
    path: "/calculators/balancesheet",
  },
  {
    title: "Billing Calculator",
    description: "Calculate billing amounts.",
    path: "/calculators/billing",
  },
  {
    title: "Profit & Loss Calculator",
    description: "Calculate business profit or loss.",
    path: "/calculators/profit-loss",
  },
];

function AllCalculators() {
  return (
    <div
      style={{
        padding: "80px 10%",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        All Calculators
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {calculators.map((item, index) => (
          <CalculatorCard
            key={index}
            title={item.title}
            description={item.description}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}

export default AllCalculators;