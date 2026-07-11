function InterestHistory({
  history,
  clearHistory,
}) {
  if (history.length === 0) return null;

  return (
    <div className="history-card">
      <div className="history-header">
        <h2>📜 Interest History</h2>

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
            <strong>Principal:</strong>{" "}
            ₹
            {Number(item.principal).toLocaleString(
              "en-IN"
            )}
          </p>

          <p>
            <strong>Interest Rate:</strong>{" "}
            {item.rate}%
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {item.time}{" "}
            {item.timeType}
          </p>

          <p>
            <strong>Interest Type:</strong>{" "}
            {item.interestType === "simple"
              ? "Simple Interest"
              : "Compound Interest"}
          </p>

          {item.interestType === "compound" && (
            <p>
              <strong>Compounding:</strong>{" "}
              {item.frequency}
            </p>
          )}

          <p>
            <strong>Interest Earned:</strong>{" "}
            ₹
            {Number(
              item.interest
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Total Amount:</strong>{" "}
            ₹
            {Number(
              item.totalAmount
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

export default InterestHistory;