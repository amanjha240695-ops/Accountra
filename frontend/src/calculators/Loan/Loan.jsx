import { useState } from "react";
import "./Loan.css";
import useRequireLogin from "../../hooks/useRequireLogin";
import { calculateLoan } from "./LoanUtils";
import LoanResult from "./LoanResult";
import LoanHistory from "./LoanHistory";

function Loan() {
  const checkLogin = useRequireLogin();

  const [formData, setFormData] = useState({
    monthlyIncome: "",
    existingEMI: "",
    rate: "",
    tenure: "",
    tenureType: "years",
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Calculate Loan Eligibility
  const handleCalculate = () => {

  if (!checkLogin()) return;

  const response = calculateLoan(formData);
    if (!response.success) {
      alert(response.message);
      return;
    }

    setResult(response.result);

    setHistory((prev) => [
      {
        ...response.result,
        monthlyIncome: formData.monthlyIncome,
        existingEMI: formData.existingEMI,
        rate: formData.rate,
        tenure: formData.tenure,
        tenureType: formData.tenureType,
      },
      ...prev,
    ]);
  };

  // Reset
  const resetForm = () => {
    setFormData({
      monthlyIncome: "",
      existingEMI: "",
      rate: "",
      tenure: "",
      tenureType: "years",
    });

    setResult(null);
  };

  // Clear History
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="loan-container">
      <h1>🏦 Loan Eligibility Calculator</h1>

      {/* Monthly Income */}
      <div className="form-group">
        <label>Monthly Income (₹)</label>

        <input
          type="number"
          name="monthlyIncome"
          placeholder="Enter Monthly Income"
          value={formData.monthlyIncome}
          onChange={handleChange}
        />
      </div>

      {/* Existing EMI */}
      <div className="form-group">
        <label>Existing Monthly EMI (₹)</label>

        <input
          type="number"
          name="existingEMI"
          placeholder="Enter Existing EMI"
          value={formData.existingEMI}
          onChange={handleChange}
        />
      </div>

      {/* Interest Rate */}
      <div className="form-group">
        <label>Interest Rate (%)</label>

        <input
          type="number"
          name="rate"
          placeholder="Enter Interest Rate"
          value={formData.rate}
          onChange={handleChange}
        />
      </div>

      {/* Loan Tenure */}
      <div className="form-group">
        <label>Loan Tenure</label>

        <input
          type="number"
          name="tenure"
          placeholder="Enter Loan Tenure"
          value={formData.tenure}
          onChange={handleChange}
        />
      </div>

      {/* Tenure Type */}
      <div className="form-group">
        <label>Tenure Type</label>

        <select
          name="tenureType"
          value={formData.tenureType}
          onChange={handleChange}
        >
          <option value="years">Years</option>
          <option value="months">Months</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button
          className="calculate-btn"
          onClick={handleCalculate}
        >
          Check Eligibility
        </button>

        <button
          className="reset-btn"
          onClick={resetForm}
        >
          Reset
        </button>
      </div>

      {/* Result */}
      <LoanResult result={result} />

      {/* History */}
      <LoanHistory
        history={history}
        clearHistory={clearHistory}
      />
    </div>
  );
}

export default Loan;