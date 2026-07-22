import { useState } from "react";
import "./ProfitLoss.css";
import useRequireLogin from "../../hooks/useRequireLogin";
import { calculateProfitLoss } from "./ProfitLossUtils";
import ProfitLossResult from "./ProfitLossResult";
import ProfitLossHistory from "./ProfitLossHistory";

function ProfitLoss() {
  const checkLogin = useRequireLogin();

  const [formData, setFormData] = useState({
    costPrice: "",
    sellingPrice: "",
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

  if (!checkLogin()) return;

  const response = calculateProfitLoss(formData);
    if (!response.success) {
      alert(response.message);
      return;
    }

    setResult(response.result);

    setHistory((prev) => [
      {
        ...response.result,
      },
      ...prev,
    ]);
  };

  // Reset
  const resetForm = () => {
    setFormData({
      costPrice: "",
      sellingPrice: "",
    });

    setResult(null);
  };

  // Clear History
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="profitloss-container">
      <h1>📈 Profit & Loss Calculator</h1>

      {/* Cost Price */}
      <div className="form-group">
        <label>Cost Price (₹)</label>

        <input
          type="number"
          name="costPrice"
          placeholder="Enter Cost Price"
          value={formData.costPrice}
          onChange={handleChange}
        />
      </div>

      {/* Selling Price */}
      <div className="form-group">
        <label>Selling Price (₹)</label>

        <input
          type="number"
          name="sellingPrice"
          placeholder="Enter Selling Price"
          value={formData.sellingPrice}
          onChange={handleChange}
        />
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
      <ProfitLossResult result={result} />

      {/* History */}
      <ProfitLossHistory
        history={history}
        clearHistory={clearHistory}
      />

    </div>
  );
}

export default ProfitLoss;