import { useState } from "react";
import "./Interest.css";

import { calculateInterest } from "./InterestUtils";
import InterestResult from "./InterestResult";
import InterestHistory from "./InterestHistory";

function Interest() {
  const [formData, setFormData] = useState({
    principal: "",
    rate: "",
    time: "",
    timeType: "years",
    interestType: "simple",
    frequency: "yearly",
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

  // Calculate
  const handleCalculate = () => {
    const response = calculateInterest(formData);

    if (!response.success) {
      alert(response.message);
      return;
    }

    setResult(response.result);

    setHistory((prev) => [
      {
        ...response.result,
        principal: formData.principal,
        rate: formData.rate,
        time: formData.time,
        timeType: formData.timeType,
        interestType: formData.interestType,
        frequency: formData.frequency,
      },
      ...prev,
    ]);
  };

  // Reset
  const resetForm = () => {
    setFormData({
      principal: "",
      rate: "",
      time: "",
      timeType: "years",
      interestType: "simple",
      frequency: "yearly",
    });

    setResult(null);
  };

  // Clear History
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="interest-container">
      <h1>📈 Interest Calculator</h1>

      {/* Principal */}
      <div className="form-group">
        <label>Principal Amount (₹)</label>

        <input
          type="number"
          name="principal"
          placeholder="Enter Principal Amount"
          value={formData.principal}
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

      {/* Time */}
      <div className="form-group">
        <label>Time</label>

        <input
          type="number"
          name="time"
          placeholder="Enter Time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>

      {/* Time Type */}
      <div className="form-group">
        <label>Time Type</label>

        <select
          name="timeType"
          value={formData.timeType}
          onChange={handleChange}
        >
          <option value="years">Years</option>
          <option value="months">Months</option>
        </select>
      </div>

      {/* Interest Type */}
      <div className="form-group">
        <label>Interest Type</label>

        <select
          name="interestType"
          value={formData.interestType}
          onChange={handleChange}
        >
          <option value="simple">
            Simple Interest
          </option>

          <option value="compound">
            Compound Interest
          </option>
        </select>
      </div>

      {/* Compound Frequency */}

      {formData.interestType === "compound" && (
        <div className="form-group">
          <label>Compounding</label>

          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            <option value="yearly">Yearly</option>
            <option value="half-yearly">
              Half-Yearly
            </option>
            <option value="quarterly">
              Quarterly
            </option>
            <option value="monthly">
              Monthly
            </option>
          </select>
        </div>
      )}

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

      <InterestResult result={result} />

      <InterestHistory
        history={history}
        clearHistory={clearHistory}
      />

    </div>
  );
}

export default Interest;