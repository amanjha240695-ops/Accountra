import { formatCurrency, copyGSTResult } from "./GSTUtills";
import jsPDF from "jspdf";

function GSTResult({ result, rate }) {
  if (!result) return null;

  // Copy Result
  const handleCopy = async () => {
    await copyGSTResult(result, rate);
    alert("Result copied successfully!");
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Accountra GST Report", 20, 20);

    doc.setFontSize(14);

    let y = 40;

    const addRow = (label, value) => {
      doc.text(`${label}`, 20, y);
      doc.text(`${value}`, 120, y);
      y += 10;
    };

    addRow("Mode", result.mode);
    addRow("GST Rate", `${rate}%`);
    addRow("Original Amount", formatCurrency(result.originalAmount));

    if (result.gstAmount)
      addRow("GST Amount", formatCurrency(result.gstAmount));

    if (result.igst)
      addRow("IGST", formatCurrency(result.igst));

    if (result.cgst)
      addRow("CGST", formatCurrency(result.cgst));

    if (result.sgst)
      addRow("SGST", formatCurrency(result.sgst));

    if (result.utgst)
      addRow("UTGST", formatCurrency(result.utgst));

    if (result.totalGST)
      addRow("Total GST", formatCurrency(result.totalGST));

    addRow("Final Amount", formatCurrency(result.finalAmount));

    doc.save("GST_Report.pdf");
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
      title: "GST Calculation",
      text: `Final Amount : ${formatCurrency(result.finalAmount)}`,
    });
  };

  return (
    <div className="result-card">

      <h2>Calculation Result</h2>

      <div className="result-row">
        <span>Mode</span>
        <span>{result.mode}</span>
      </div>

      <div className="result-row">
        <span>Original Amount</span>
        <span>{formatCurrency(result.originalAmount)}</span>
      </div>

      {result.gstAmount && (
        <div className="result-row">
          <span>GST Amount</span>
          <span>{formatCurrency(result.gstAmount)}</span>
        </div>
      )}

      {result.igst && (
        <div className="result-row">
          <span>IGST</span>
          <span>{formatCurrency(result.igst)}</span>
        </div>
      )}

      {result.cgst && (
        <div className="result-row">
          <span>CGST</span>
          <span>{formatCurrency(result.cgst)}</span>
        </div>
      )}

      {result.sgst && (
        <div className="result-row">
          <span>SGST</span>
          <span>{formatCurrency(result.sgst)}</span>
        </div>
      )}

      {result.utgst && (
        <div className="result-row">
          <span>UTGST</span>
          <span>{formatCurrency(result.utgst)}</span>
        </div>
      )}

      {result.totalGST && (
        <div className="result-row">
          <span>Total GST</span>
          <span>{formatCurrency(result.totalGST)}</span>
        </div>
      )}

      <div className="result-row total">
        <span>Final Amount</span>
        <span>{formatCurrency(result.finalAmount)}</span>
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

export default GSTResult;