function TDSHistory({
  history,
  clearHistory,
}) {
  if (history.length === 0) return null;

  return (
    <div className="history-card">
      <div className="history-header">
        <h2>📜 TDS History</h2>

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
            <strong>Gross Amount:</strong>{" "}
            ₹
            {Number(item.amount).toLocaleString(
              "en-IN"
            )}
          </p>

          <p>
            <strong>TDS Rate:</strong>{" "}
            {item.rate}%
          </p>

          <p>
            <strong>TDS Deducted:</strong>{" "}
            ₹
            {Number(
              item.tdsAmount
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Net Amount:</strong>{" "}
            ₹
            {Number(
              item.netAmount
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

export default TDSHistory;