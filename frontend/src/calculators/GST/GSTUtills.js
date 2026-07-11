
// -----------------------------
// Indian Currency Formatter
// -----------------------------
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
};

// -----------------------------
// GST Calculation
// -----------------------------
export const calculateGST = ({
  amount,
  rate,
  calculation,
  taxType,
}) => {
  const amt = Number(amount);
  const gstRate = Number(rate);

  if (!amt || amt <= 0) {
    return {
      success: false,
      message: "Please enter a valid amount.",
    };
  }

  let result = {};

  // -----------------------------
  // Add GST
  // -----------------------------
  if (calculation === "add") {
    const gstAmount = (amt * gstRate) / 100;

    result = {
      mode: "Add GST",
      originalAmount: amt,
      gstAmount,
      finalAmount: amt + gstAmount,
    };
  }

  // -----------------------------
  // Remove GST
  // -----------------------------
  else if (calculation === "remove") {
    const originalAmount = (amt * 100) / (100 + gstRate);
    const gstAmount = amt - originalAmount;

    result = {
      mode: "Remove GST",
      originalAmount,
      gstAmount,
      finalAmount: amt,
    };
  }

  // -----------------------------
  // GST Breakdown
  // -----------------------------
  else if (calculation === "breakdown") {
    const totalGST = (amt * gstRate) / 100;

    if (taxType === "igst") {
      result = {
        mode: "IGST",
        originalAmount: amt,
        igst: totalGST,
        totalGST,
        finalAmount: amt + totalGST,
      };
    }

    if (taxType === "cgst_sgst") {
      result = {
        mode: "CGST + SGST",
        originalAmount: amt,
        cgst: totalGST / 2,
        sgst: totalGST / 2,
        totalGST,
        finalAmount: amt + totalGST,
      };
    }

    if (taxType === "utgst_cgst") {
      result = {
        mode: "CGST + UTGST",
        originalAmount: amt,
        cgst: totalGST / 2,
        utgst: totalGST / 2,
        totalGST,
        finalAmount: amt + totalGST,
      };
    }
  }

  return {
    success: true,
    result,
  };
};

// -----------------------------
// Copy Result
// -----------------------------
export const copyGSTResult = async (result, rate) => {
  if (!result) return;

  let text = `GST Calculation

Mode : ${result.mode}
GST Rate : ${rate}%

Original Amount : ${formatCurrency(result.originalAmount)}
`;

  if (result.gstAmount)
    text += `GST Amount : ${formatCurrency(result.gstAmount)}\n`;

  if (result.igst)
    text += `IGST : ${formatCurrency(result.igst)}\n`;

  if (result.cgst)
    text += `CGST : ${formatCurrency(result.cgst)}\n`;

  if (result.sgst)
    text += `SGST : ${formatCurrency(result.sgst)}\n`;

  if (result.utgst)
    text += `UTGST : ${formatCurrency(result.utgst)}\n`;

  if (result.totalGST)
    text += `Total GST : ${formatCurrency(result.totalGST)}\n`;

  text += `Final Amount : ${formatCurrency(result.finalAmount)}`;

  await navigator.clipboard.writeText(text);

  return true;
};