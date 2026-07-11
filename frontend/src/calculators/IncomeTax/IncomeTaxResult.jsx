import jsPDF from "jspdf";
import {
  formatCurrency,
  copyIncomeTaxResult,
} from "./IncomeTaxUtils";

function IncomeTaxResult({ result }) {
  if (!result) return null;

  // Copy
  const handleCopy = async () => {
    await copyIncomeTaxResult(result);
    alert("Result copied successfully!");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Accountra Income Tax Report", 20, 20);

    doc.setFontSize(14);

    let y = 40;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value), 120, y);
      y += 10;
    };

    addRow(
      "Annual Income",
      formatCurrency(result.annualIncome)
    );

    addRow(
      "Tax Regime",
      result.regime
    );

    addRow(
      "Taxable Income",
      formatCurrency(result.taxableIncome)
    );

    addRow(
      "Income Tax",
      formatCurrency(result.incomeTax)
    );

    addRow(
      "Effective Tax Rate",
      `${result.effectiveRate.toFixed(2)}%`
    );

    doc.save("Income_Tax_Report.pdf");
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
      title: "Income Tax Calculation",
      text: `
Annual Income : ${formatCurrency(result.annualIncome)}

Tax Regime : ${result.regime}

Income Tax : ${formatCurrency(result.incomeTax)}

Effective Tax Rate : ${result.effectiveRate.toFixed(
        2
      )}%
      `,
    });
  };

  return (
    <div className="result-card">

      <h2>Income Tax Result</h2>

      <div className="result-row">
        <span>Annual Income</span>
        <span>{formatCurrency(result.annualIncome)}</span>
      </div>

      <div className="result-row">
        <span>Tax Regime</span>
        <span>{result.regime}</span>
      </div>

      <div className="result-row">
        <span>Taxable Income</span>
        <span>{formatCurrency(result.taxableIncome)}</span>
      </div>

      <div className="result-row">
        <span>Income Tax</span>
        <span>{formatCurrency(result.incomeTax)}</span>
      </div>

      <div className="result-row total">
        <span>Effective Tax Rate</span>
        <span>{result.effectiveRate.toFixed(2)}%</span>
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

export default IncomeTaxResult;