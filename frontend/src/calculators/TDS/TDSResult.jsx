import jsPDF from "jspdf";
import {
  formatCurrency,
  copyTDSResult,
} from "./TDSUtils";

function TDSResult({ result }) {
  if (!result) return null;

  // Copy
  const handleCopy = async () => {
    await copyTDSResult(result);
    alert("Result copied successfully!");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Accountra TDS Report", 20, 20);

    doc.setFontSize(14);

    let y = 40;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value), 120, y);
      y += 10;
    };

    addRow(
      "Gross Amount",
      formatCurrency(result.grossAmount)
    );

    addRow(
      "TDS Rate",
      `${result.tdsRate}%`
    );

    addRow(
      "TDS Deducted",
      formatCurrency(result.tdsAmount)
    );

    addRow(
      "Net Amount",
      formatCurrency(result.netAmount)
    );

    doc.save("TDS_Report.pdf");
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
      title: "TDS Calculation",
      text: `
Gross Amount : ${formatCurrency(result.grossAmount)}

TDS Rate : ${result.tdsRate}%

TDS Deducted : ${formatCurrency(result.tdsAmount)}

Net Amount : ${formatCurrency(result.netAmount)}
      `,
    });
  };

  return (
    <div className="result-card">

      <h2>TDS Calculation Result</h2>

      <div className="result-row">
        <span>Gross Amount</span>
        <span>{formatCurrency(result.grossAmount)}</span>
      </div>

      <div className="result-row">
        <span>TDS Rate</span>
        <span>{result.tdsRate}%</span>
      </div>

      <div className="result-row">
        <span>TDS Deducted</span>
        <span>{formatCurrency(result.tdsAmount)}</span>
      </div>

      <div className="result-row total">
        <span>Net Amount</span>
        <span>{formatCurrency(result.netAmount)}</span>
      </div>

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

export default TDSResult;