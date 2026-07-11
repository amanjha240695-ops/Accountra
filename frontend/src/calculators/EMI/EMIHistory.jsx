function EMIHistory({ history, clearHistory }) {
  if (history.length === 0) return null;

  return (
    <div className="history-card">
      <div className="history-header">
        <h2>📜 EMI History</h2>

        <button
          className="clear-btn"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>

      {history.map((item, index) => {
        const monthlyEMI = Number(item?.monthlyEMI ?? 0);
        const totalInterest = Number(item?.totalInterest ?? item?.totalIntrest ?? 0);
        const totalPayment = Number(item?.totalPayment ?? 0);

        return (
          <div key={index} className="history-item">
            <p>
              <strong>Loan Amount:</strong>{" "}
              ₹{Number(item.amount).toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Interest Rate:</strong>{" "}
              {item.rate}%
            </p>

            <p>
              <strong>Loan Tenure:</strong>{" "}
              {item.tenure} {item.tenureType}
            </p>

            <p>
              <strong>Monthly EMI:</strong>{" "}
              ₹{monthlyEMI.toFixed(2)}
            </p>

            <p>
              <strong>Total Interest:</strong>{" "}
              ₹{totalInterest.toFixed(2)}
            </p>

            <p>
              <strong>Total Payment:</strong>{" "}
              ₹{totalPayment.toFixed(2)}
            </p>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default EMIHistory;