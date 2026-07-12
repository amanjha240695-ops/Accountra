function ProfitLossHistory({
  history,
  clearHistory,
}) {
  if (history.length === 0) return null;

  return (
    <div className="history-card">

      <div className="history-header">

        <h2>📜 Profit & Loss History</h2>

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
            <strong>Cost Price:</strong>{" "}
            ₹
            {Number(item.costPrice).toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>

          <p>
            <strong>Selling Price:</strong>{" "}
            ₹
            {Number(item.sellingPrice).toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {item.status}
          </p>

          {item.status !== "No Profit No Loss" && (
            <>
              <p>
                <strong>{item.status} Amount:</strong>{" "}
                ₹
                {Number(item.amount).toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>

              <p>
                <strong>{item.status} Percentage:</strong>{" "}
                {item.percentage.toFixed(2)}%
              </p>
            </>
          )}

          <hr />

        </div>
      ))}

    </div>
  );
}

export default ProfitLossHistory;