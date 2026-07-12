import { useState } from "react";
import "./Percentage.css";

function Percentage() {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const numericValue = Number(value);
    const numericPercent = Number(percent);

    if (value === "" || percent === "") {
      alert("Please enter both values.");
      return;
    }

    if (Number.isNaN(numericValue) || Number.isNaN(numericPercent)) {
      alert("Please enter valid numbers.");
      return;
    }

    const calculatedResult = (numericValue * numericPercent) / 100;
    setResult({
      value: numericValue,
      percent: numericPercent,
      result: calculatedResult,
    });
  };

  const resetForm = () => {
    setValue("");
    setPercent("");
    setResult(null);
  };

  return (
    <div className="percentage-container">
      <h1>📊 Percentage Calculator</h1>

      <form className="percentage-form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label>Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>

        <div className="form-group">
          <label>Percentage (%)</label>
          <input
            type="number"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            placeholder="Enter percentage"
          />
        </div>

        <div className="button-group">
          <button className="calculate-btn" type="submit">
            Calculate
          </button>
          <button className="reset-btn" type="button" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div className="result-card">
          <h3>Result</h3>
          <p>
            {result.percent}% of {result.value} is {result.result}
          </p>
        </div>
      )}
    </div>
  );
}

export default Percentage;
