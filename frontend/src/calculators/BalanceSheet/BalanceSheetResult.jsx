import jsPDF from "jspdf";
import { formatCurrency, copyBalanceSheetResult } from "./BalanceSheetUtils";

function BalanceSheetResult({ result }) {
  if (!result) return null;

  const handleCopy = async () => {
    await copyBalanceSheetResult(result);
    alert("Balance Sheet copied successfully!");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Accountra Balance Sheet Report", 20, 20);
    doc.setFontSize(14);
    let y = 40;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value), 120, y);
      y += 10;
    };

    addRow("Total Assets", formatCurrency(result.totalAssets));
    addRow("Total Liabilities", formatCurrency(result.totalLiabilities));
    addRow("Owner Equity", formatCurrency(result.ownerEquity));
    doc.save("Balance_Sheet_Report.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!navigator.share) {
      alert("Sharing is not supported on this browser.");
      return;
    }

    await navigator.share({
      title: "Balance Sheet Report",
      text: `\nTotal Assets:\n${formatCurrency(result.totalAssets)}\nTotal Liabilities:\n${formatCurrency(result.totalLiabilities)}\nOwner Equity:\n${formatCurrency(result.ownerEquity)}\n      `,
    });
  };

  return (
    <div className="result-card">
      <h2>Balance Sheet Result</h2>

      <div className="result-row">
        <span>Total Assets</span>
        <span>{formatCurrency(result.totalAssets)}</span>
      </div>

      <div className="result-row">
        <span>Total Liabilities</span>
        <span>{formatCurrency(result.totalLiabilities)}</span>
      </div>

      <div className="result-row total">
        <span>Owner Equity</span>
        <span>{formatCurrency(result.ownerEquity)}</span>
      </div>

      <div className="result-buttons">
        <button className="copy-btn" onClick={handleCopy}>
          📋 Copy
        </button>

        <button className="pdf-btn" onClick={downloadPDF}>
          📄 PDF
        </button>

        <button className="print-btn" onClick={handlePrint}>
          🖨 Print
        </button>

        <button className="share-btn" onClick={handleShare}>
          🔗 Share
        </button>
      </div>
    </div>
  );
}

export default BalanceSheetResult;
