import { useState } from "react";
import "./TDS.css";

import { calculateTDS } from "./TDSUtils";
import TDSResult from "./TDSResult";
import TDSHistory from "./TDSHistory";

function TDS() {
  const [formData, setFormData] = useState({
    amount: "",
    rate: "10",
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Handle Input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Calculate TDS
  const handleCalculate = () => {
    const response = calculateTDS(formData);

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
      },
      ...prev,
    ]);
  };

  // Reset
  const resetForm = () => {
    setFormData({
      amount: "",
      rate: "10",
    });

    setResult(null);
  };

  // Clear History
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="tds-container">
      <h1>💰 TDS Calculator</h1>

      {/* Amount */}
      <div className="form-group">
        <label>Gross Amount (₹)</label>

        <input
          type="number"
          name="amount"
          placeholder="Enter Gross Amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      {/* Rate */}
      <div className="form-group">
        <label>TDS Rate (%)</label>

        <select
          name="rate"
          value={formData.rate}
          onChange={handleChange}
        >
          <option value="1">1%</option>
          <option value="2">2%</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="20">20%</option>
          <option value="30">30%</option>
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

      <TDSResult result={result} />

      {/* History */}

      <TDSHistory
        history={history}
        clearHistory={clearHistory}
      />

    </div>
  );
}

export default TDS;