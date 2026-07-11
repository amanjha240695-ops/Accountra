import { useState } from "react";
import "./EMI.css";

import { calculateEMI } from "./EMIUtils";
import EMIResult from "./EMIResult";
import EMIHistory from "./EMIHistory";

function EMI() {
  const [formData, setFormData] = useState({
    amount: "",
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

  // Calculate EMI
  const handleCalculate = () => {
    const response = calculateEMI(formData);

    if (!response.success) {
      alert(response.message);
      return;
    }

    setResult(response.result);

    setHistory((prev) => [
      {
        ...response.result,
        amount: formData.amount,
        rate: formData.rate,
        tenure: formData.tenure,
        tenureType: formData.tenureType,
      },
      ...prev,
    ]);
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      amount: "",
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
    <div className="emi-container">
      <h1>💰 EMI Calculator</h1>

      {/* Loan Amount */}
      <div className="form-group">
        <label>Loan Amount (₹)</label>

        <input
          type="number"
          name="amount"
          placeholder="Enter Loan Amount"
          value={formData.amount}
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
          Calculate
        </button>

        <button
          className="reset-btn"
          onClick={resetForm}
        >
          Reset
        </button>
      </div>

      {/* Result */}
      <EMIResult result={result} />

      {/* History */}
      <EMIHistory
        history={history}
        clearHistory={clearHistory}
      />
    </div>
  );
}

export default EMI;