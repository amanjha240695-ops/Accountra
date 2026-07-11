import jsPDF from "jspdf";
import {
  formatCurrency,
  copyInterestResult,
} from "./InterestUtils";

function InterestResult({ result }) {
  if (!result) return null;

  // Copy
  const handleCopy = async () => {
    await copyInterestResult(result);
    alert("Result copied successfully!");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Accountra Interest Report", 20, 20);

    doc.setFontSize(14);

    let y = 40;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value), 120, y);
      y += 10;
    };

    addRow(
      "Principal Amount",
      formatCurrency(result.principal)
    );

    addRow(
      "Interest Rate",
      `${result.rate}%`
    );

    addRow(
      "Time",
      `${result.time} Years`
    );

    addRow(
      "Interest Type",
      result.interestType === "simple"
        ? "Simple Interest"
        : "Compound Interest"
    );

    if (result.interestType === "compound") {
      addRow(
        "Compounding",
        result.frequency.charAt(0).toUpperCase() +
          result.frequency.slice(1)
      );
    }

    addRow(
      "Interest Earned",
      formatCurrency(result.interest)
    );

    addRow(
      "Total Amount",
      formatCurrency(result.totalAmount)
    );

    doc.save("Interest_Report.pdf");
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
      title: "Interest Calculation",
      text: `
Principal : ${formatCurrency(result.principal)}

Interest Rate : ${result.rate}%

Interest Earned : ${formatCurrency(result.interest)}

Total Amount : ${formatCurrency(result.totalAmount)}
      `,
    });
  };

  return (
    <div className="result-card">

      <h2>Interest Calculation Result</h2>

      <div className="result-row">
        <span>Principal Amount</span>
        <span>{formatCurrency(result.principal)}</span>
      </div>

      <div className="result-row">
        <span>Interest Rate</span>
        <span>{result.rate}%</span>
      </div>

      <div className="result-row">
        <span>Time</span>
        <span>{result.time} Years</span>
      </div>

      <div className="result-row">
        <span>Interest Type</span>
        <span>
          {result.interestType === "simple"
            ? "Simple Interest"
            : "Compound Interest"}
        </span>
      </div>

      {result.interestType === "compound" && (
        <div className="result-row">
          <span>Compounding</span>
          <span>{result.frequency}</span>
        </div>
      )}

      <div className="result-row">
        <span>Interest Earned</span>
        <span>{formatCurrency(result.interest)}</span>
      </div>

      <div className="result-row total">
        <span>Total Amount</span>
        <span>{formatCurrency(result.totalAmount)}</span>
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

export default InterestResult;