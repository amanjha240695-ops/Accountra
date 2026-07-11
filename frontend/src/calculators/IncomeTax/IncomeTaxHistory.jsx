function IncomeTaxHistory({
  history,
  clearHistory,
}) {
  if (history.length === 0) return null;

  return (
    <div className="history-card">
      <div className="history-header">
        <h2>📜 Income Tax History</h2>

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
            <strong>Annual Income:</strong>{" "}
            ₹
            {Number(item.income).toLocaleString(
              "en-IN"
            )}
          </p>

          <p>
            <strong>Tax Regime:</strong>{" "}
            {item.regime}
          </p>

          <p>
            <strong>Taxable Income:</strong>{" "}
            ₹
            {Number(
              item.taxableIncome
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Income Tax:</strong>{" "}
            ₹
            {Number(
              item.incomeTax
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Effective Tax Rate:</strong>{" "}
            {Number(
              item.effectiveRate
            ).toFixed(2)}
            %
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default IncomeTaxHistory;