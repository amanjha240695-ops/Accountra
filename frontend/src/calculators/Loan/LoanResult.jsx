import jsPDF from "jspdf";
import { formatCurrency, copyLoanResult } from "./LoanUtils";

function LoanResult({ result }) {
  if (!result) return null;

  // Copy
  const handleCopy = async () => {
    await copyLoanResult(result);
    alert("Result copied successfully!");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Accountra Loan Eligibility Report", 20, 20);

    doc.setFontSize(14);

    let y = 40;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value), 120, y);
      y += 10;
    };

    addRow("Monthly Income", formatCurrency(result.monthlyIncome));
    addRow("Existing EMI", formatCurrency(result.existingEMI));
    addRow("Eligible EMI", formatCurrency(result.eligibleEMI));
    addRow("Maximum Eligible Loan", formatCurrency(result.eligibleLoan));
    addRow("Total Interest", formatCurrency(result.totalInterest));
    addRow("Total Payment", formatCurrency(result.totalPayment));
    addRow("Loan Duration", `${result.months} Months`);

    doc.save("Loan_Eligibility_Report.pdf");
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
      title: "Loan Eligibility Result",
      text: `
Monthly Income : ${formatCurrency(result.monthlyIncome)}
Existing EMI : ${formatCurrency(result.existingEMI)}
Eligible EMI : ${formatCurrency(result.eligibleEMI)}
Maximum Loan : ${formatCurrency(result.eligibleLoan)}
      `,
    });
  };

  return (
    <div className="result-card">

      <h2>Loan Eligibility Result</h2>

      <div className="result-row">
        <span>Monthly Income</span>
        <span>{formatCurrency(result.monthlyIncome)}</span>
      </div>

      <div className="result-row">
        <span>Existing EMI</span>
        <span>{formatCurrency(result.existingEMI)}</span>
      </div>

      <div className="result-row">
        <span>Eligible EMI</span>
        <span>{formatCurrency(result.eligibleEMI)}</span>
      </div>

      <div className="result-row">
        <span>Maximum Eligible Loan</span>
        <span>{formatCurrency(result.eligibleLoan)}</span>
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

export default LoanResult;