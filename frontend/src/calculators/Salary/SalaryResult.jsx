import jsPDF from "jspdf";
import {
  formatCurrency,
  copySalaryResult,
} from "./SalaryUtils";

function SalaryResult({ result }) {
  if (!result) return null;

  // Copy
  const handleCopy = async () => {
    await copySalaryResult(result);
    alert("Result copied successfully!");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Accountra Salary Report", 20, 20);

    doc.setFontSize(14);

    let y = 40;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value), 120, y);
      y += 10;
    };

    addRow(
      "Basic Salary",
      formatCurrency(result.basicSalary)
    );

    addRow(
      "HRA",
      formatCurrency(result.hra)
    );

    addRow(
      "Other Allowances",
      formatCurrency(result.allowances)
    );

    addRow(
      "Gross Salary",
      formatCurrency(result.grossSalary)
    );

    addRow(
      "Total Deductions",
      formatCurrency(result.deductions)
    );

    addRow(
      "Net Salary",
      formatCurrency(result.netSalary)
    );

    doc.save("Salary_Report.pdf");
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
      title: "Salary Calculation",
      text: `
Basic Salary : ${formatCurrency(result.basicSalary)}

Gross Salary : ${formatCurrency(result.grossSalary)}

Net Salary : ${formatCurrency(result.netSalary)}
      `,
    });
  };

  return (
    <div className="result-card">

      <h2>Salary Calculation Result</h2>

      <div className="result-row">
        <span>Basic Salary</span>
        <span>{formatCurrency(result.basicSalary)}</span>
      </div>

      <div className="result-row">
        <span>HRA</span>
        <span>{formatCurrency(result.hra)}</span>
      </div>

      <div className="result-row">
        <span>Other Allowances</span>
        <span>{formatCurrency(result.allowances)}</span>
      </div>

      <div className="result-row">
        <span>Gross Salary</span>
        <span>{formatCurrency(result.grossSalary)}</span>
      </div>

      <div className="result-row">
        <span>Total Deductions</span>
        <span>{formatCurrency(result.deductions)}</span>
      </div>

      <div className="result-row total">
        <span>Net Salary</span>
        <span>{formatCurrency(result.netSalary)}</span>
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

export default SalaryResult;