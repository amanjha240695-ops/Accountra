import { formatCurrency } from "./GSTUtills";

function GSTHistory({ history, clearHistory }) {
  if (!history.length) return null;

  return (
    <div className="history-card">

      <div className="history-header">
        <h2>Recent Calculations</h2>

        <button
          className="clear-history-btn"
          onClick={clearHistory}
        >
          Clear
        </button>
      </div>

      {history.map((item, index) => (
        <div className="history-item" key={index}>

          <div>
            <strong>{item.mode}</strong>
            <p>{item.rate}% GST</p>
          </div>

          <div>
            <strong>
              {formatCurrency(item.finalAmount)}
            </strong>
          </div>

        </div>
      ))}

    </div>
  );
}

export default GSTHistory;