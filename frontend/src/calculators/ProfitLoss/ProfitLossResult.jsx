import jsPDF from "jspdf";
import {
  formatCurrency,
  copyProfitLossResult,
} from "./ProfitLossUtils";

function ProfitLossResult({ result }) {
  if (!result) return null;

  // Copy
  const handleCopy = async () => {
    await copyProfitLossResult(result);
    alert("Result copied successfully!");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Accountra Profit & Loss Report", 20, 20);

    doc.setFontSize(14);

    let y = 40;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value), 120, y);
      y += 10;
    };

    addRow(
      "Cost Price",
      formatCurrency(result.costPrice)
    );

    addRow(
      "Selling Price",
      formatCurrency(result.sellingPrice)
    );

    addRow(
      "Status",
      result.status
    );

    if (result.status !== "No Profit No Loss") {
      addRow(
        `${result.status} Amount`,
        formatCurrency(result.amount)
      );

      addRow(
        `${result.status} Percentage`,
        `${result.percentage.toFixed(2)}%`
      );
    }

    doc.save("ProfitLoss_Report.pdf");
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Share
  const handleShare = async () => {
    if (!navigator.share) {
      alert("Sharing is not supported on this browser.");
      return;
    }

    await navigator.share({
      title: "Profit & Loss Calculation",
      text: `
Cost Price : ${formatCurrency(result.costPrice)}

Selling Price : ${formatCurrency(result.sellingPrice)}

Status : ${result.status}

${
  result.status !== "No Profit No Loss"
    ? `${result.status} Amount : ${formatCurrency(result.amount)}

${result.status} Percentage : ${result.percentage.toFixed(2)}%`
    : ""
}
      `,
    });
  };

  return (
    <div className="result-card">

      <h2>Profit & Loss Result</h2>

      <div className="result-row">
        <span>Cost Price</span>
        <span>{formatCurrency(result.costPrice)}</span>
      </div>

      <div className="result-row">
        <span>Selling Price</span>
        <span>{formatCurrency(result.sellingPrice)}</span>
      </div>

      <div className="result-row">
        <span>Status</span>
        <span>{result.status}</span>
      </div>

      {result.status !== "No Profit No Loss" && (
        <>
          <div className="result-row">
            <span>{result.status} Amount</span>
            <span>{formatCurrency(result.amount)}</span>
          </div>

          <div className="result-row total">
            <span>{result.status} Percentage</span>
            <span>{result.percentage.toFixed(2)}%</span>
          </div>
        </>
      )}

      <div className="result-buttons">

        <button
          className="copy-btn"
          onClick={handleCopy}
        >
          📋 Copy
        </button>

        <button
          className="pdf-btn"
          onClick={downloadPDF}
        >
          📄 PDF
        </button>

        <button
          className="print-btn"
          onClick={handlePrint}
        >
          🖨 Print
        </button>

        <button
          className="share-btn"
          onClick={handleShare}
        >
          🔗 Share
        </button>

      </div>

    </div>
  );
}

export default ProfitLossResult;