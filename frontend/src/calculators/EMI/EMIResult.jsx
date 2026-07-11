import jsPDF from "jspdf";
import { formatCurrency, copyEMIResult } from "./EMIUtils";

function EMIResult({ result }) {
  if (!result) return null;

  // Copy
  const handleCopy = async () => {
    await copyEMIResult(result);
    alert("Result copied successfully!");
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Accountra EMI Report", 20, 20);

    doc.setFontSize(14);

    let y = 40;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value), 120, y);
      y += 10;
    };

    addRow("Loan Amount", formatCurrency(result.loanAmount));
    addRow("Monthly EMI", formatCurrency(result.monthlyEMI));
    addRow("Total Interest", formatCurrency(result.totalInterest));
    addRow("Total Payment", formatCurrency(result.totalPayment));
    addRow("Loan Duration", `${result.months} Months`);

    doc.save("EMI_Report.pdf");
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
      title: "EMI Calculation",
      text: `
Loan Amount: ${formatCurrency(result.loanAmount)}
Monthly EMI: ${formatCurrency(result.monthlyEMI)}
Total Interest: ${formatCurrency(result.totalInterest)}
Total Payment: ${formatCurrency(result.totalPayment)}
      `,
    });
  };

  return (
    <div className="result-card">
      <h2>EMI Result</h2>

      <div className="result-row">
        <span>Loan Amount</span>
        <span>{formatCurrency(result.loanAmount)}</span>
      </div>

      <div className="result-row">
        <span>Monthly EMI</span>
        <span>{formatCurrency(result.monthlyEMI)}</span>
      </div>

      <div className="result-row">
        <span>Total Interest</span>
        <span>{formatCurrency(result.totalInterest)}</span>
      </div>

      <div className="result-row">
        <span>Total Payment</span>
        <span>{formatCurrency(result.totalPayment)}</span>
      </div>

      <div className="result-row total">
        <span>Loan Duration</span>
        <span>{result.months} Months</span>
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

export default EMIResult;