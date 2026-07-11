// ==============================
// Calculate TDS
// ==============================

export const calculateTDS = ({ amount, rate }) => {
  if (!amount || !rate) {
    return {
      success: false,
      message: "Please fill all fields.",
    };
  }

  const grossAmount = Number(amount);
  const tdsRate = Number(rate);

  if (grossAmount <= 0 || tdsRate < 0) {
    return {
      success: false,
      message: "Please enter valid values.",
    };
  }

  const tdsAmount = (grossAmount * tdsRate) / 100;
  const netAmount = grossAmount - tdsAmount;

  return {
    success: true,

    result: {
      grossAmount,
      tdsRate,
      tdsAmount,
      netAmount,
    },
  };
};

// ==============================
// Format Currency
// ==============================

export const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// ==============================
// Copy Result
// ==============================

export const copyTDSResult = async (result) => {
  const text = `
TDS Calculation Report

Gross Amount : ${formatCurrency(result.grossAmount)}

TDS Rate : ${result.tdsRate}%

TDS Deducted : ${formatCurrency(result.tdsAmount)}

Net Amount : ${formatCurrency(result.netAmount)}
`;

  await navigator.clipboard.writeText(text);
};