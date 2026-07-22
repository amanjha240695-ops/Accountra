import { useState } from "react";
import "./IncomeTax.css";
import useRequireLogin from "../../hooks/useRequireLogin";
import { calculateIncomeTax } from "./IncomeTaxUtils";
import IncomeTaxResult from "./IncomeTaxResult";
import IncomeTaxHistory from "./IncomeTaxHistory";

function IncomeTax() {
  const checkLogin = useRequireLogin();

  const [formData, setFormData] = useState({
    income: "",
    regime: "new",
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCalculate = () => {

  if (!checkLogin()) return;

  const response = calculateIncomeTax(formData);
    if (!response.success) {
      alert(response.message);
      return;
    }

    setResult(response.result);

    setHistory((prev) => [
      {
        ...response.result,
        income: formData.income,
        regime: formData.regime,
      },
      ...prev,
    ]);
  };

  const resetForm = () => {
    setFormData({
      income: "",
      regime: "new",
    });

    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="income-tax-container">

      <h1>💼 Income Tax Calculator</h1>

      <div className="form-group">
        <label>Annual Income (₹)</label>

        <input
          type="number"
          name="income"
          placeholder="Enter Annual Income"
          value={formData.income}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Tax Regime</label>

        <select
          name="regime"
          value={formData.regime}
          onChange={handleChange}
        >
          <option value="new">New Regime</option>
          <option value="old">Old Regime</option>
        </select>
      </div>

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

      <IncomeTaxResult result={result} />

      <IncomeTaxHistory
        history={history}
        clearHistory={clearHistory}
      />

    </div>
  );
}

export default IncomeTax;