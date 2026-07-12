function SalaryHistory({
  history,
  clearHistory,
}) {
  if (history.length === 0) return null;

  return (
    <div className="history-card">

      <div className="history-header">
        <h2>📜 Salary History</h2>

        <button
          className="clear-btn"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>

      {history.map((item, index) => (
        <div
          key={index}
          className="history-item"
        >
          <p>
            <strong>Basic Salary:</strong>{" "}
            ₹
            {Number(
              item.basicSalary
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>HRA:</strong>{" "}
            ₹
            {Number(
              item.hra
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Other Allowances:</strong>{" "}
            ₹
            {Number(
              item.allowances
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Gross Salary:</strong>{" "}
            ₹
            {Number(
              item.grossSalary
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Total Deductions:</strong>{" "}
            ₹
            {Number(
              item.deductions
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Net Salary:</strong>{" "}
            ₹
            {Number(
              item.netSalary
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <hr />
        </div>
      ))}

    </div>
  );
}

export default SalaryHistory;