import { useState } from "react";
import "./Salary.css";
import useRequireLogin from "../../hooks/useRequireLogin";
import { calculateSalary } from "./SalaryUtils";
import SalaryResult from "./SalaryResult";
import SalaryHistory from "./SalaryHistory";

function Salary() {
  const checkLogin = useRequireLogin();

  const [formData, setFormData] = useState({
    basicSalary: "",
    hra: "",
    allowances: "",
    deductions: "",
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

  // Calculate Salary
 const handleCalculate = () => {

  if (!checkLogin()) return;

  const response = calculateSalary(formData);

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

  // Reset Form
  const resetForm = () => {
    setFormData({
      basicSalary: "",
      hra: "",
      allowances: "",
      deductions: "",
    });

    setResult(null);
  };

  // Clear History
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="salary-container">
      <h1>💼 Salary Calculator</h1>

      {/* Basic Salary */}
      <div className="form-group">
        <label>Basic Salary (₹)</label>

        <input
          type="number"
          name="basicSalary"
          placeholder="Enter Basic Salary"
          value={formData.basicSalary}
          onChange={handleChange}
        />
      </div>

      {/* HRA */}
      <div className="form-group">
        <label>House Rent Allowance (HRA) (₹)</label>

        <input
          type="number"
          name="hra"
          placeholder="Enter HRA"
          value={formData.hra}
          onChange={handleChange}
        />
      </div>

      {/* Other Allowances */}
      <div className="form-group">
        <label>Other Allowances (₹)</label>

        <input
          type="number"
          name="allowances"
          placeholder="Enter Other Allowances"
          value={formData.allowances}
          onChange={handleChange}
        />
      </div>

      {/* Deductions */}
      <div className="form-group">
        <label>Total Deductions (₹)</label>

        <input
          type="number"
          name="deductions"
          placeholder="Enter Total Deductions"
          value={formData.deductions}
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
      <SalaryResult result={result} />

      {/* History */}
      <SalaryHistory
        history={history}
        clearHistory={clearHistory}
      />
    </div>
  );
}

export default Salary;