function LoanHistory({ history, clearHistory }) {
  if (history.length === 0) return null;

  return (
    <div className="history-card">
      <div className="history-header">
        <h2>📜 Loan History</h2>

        <button
          className="clear-btn"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>

      {history.map((item, index) => (
        <div key={index} className="history-item">

          <p>
            <strong>Monthly Income:</strong>{" "}
            ₹{Number(item.monthlyIncome).toLocaleString("en-IN")}
          </p>

          <p>
            <strong>Existing EMI:</strong>{" "}
            ₹{Number(item.existingEMI).toLocaleString("en-IN")}
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
            <strong>Eligible EMI:</strong>{" "}
            ₹{Number(item.eligibleEMI).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Eligible Loan:</strong>{" "}
            ₹{Number(item.eligibleLoan).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Total Interest:</strong>{" "}
            ₹{Number(item.totalInterest).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Total Payment:</strong>{" "}
            ₹{Number(item.totalPayment).toLocaleString("en-IN", {
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

export default LoanHistory;