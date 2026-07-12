// ==============================
// Calculate Profit & Loss
// ==============================

export const calculateProfitLoss = ({
  costPrice,
  sellingPrice,
}) => {
  if (
    costPrice === "" ||
    sellingPrice === ""
  ) {
    return {
      success: false,
      message: "Please fill all fields.",
    };
  }

  const cp = Number(costPrice);
  const sp = Number(sellingPrice);

  if (cp <= 0 || sp <= 0) {
    return {
      success: false,
      message: "Values must be greater than zero.",
    };
  }

  let status = "";
  let amount = 0;
  let percentage = 0;

  if (sp > cp) {
    status = "Profit";
    amount = sp - cp;
    percentage = (amount / cp) * 100;
  } else if (cp > sp) {
    status = "Loss";
    amount = cp - sp;
    percentage = (amount / cp) * 100;
  } else {
    status = "No Profit No Loss";
  }

  return {
    success: true,

    result: {
      costPrice: cp,
      sellingPrice: sp,
      status,
      amount,
      percentage,
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

export const copyProfitLossResult = async (
  result
) => {
  const text = `
Profit & Loss Report

Cost Price : ${formatCurrency(result.costPrice)}

Selling Price : ${formatCurrency(result.sellingPrice)}

Status : ${result.status}

${
  result.status !== "No Profit No Loss"
    ? `${result.status} Amount : ${formatCurrency(result.amount)}

${result.status} Percentage : ${result.percentage.toFixed(2)}%`
    : "No Profit No Loss"
}
`;

  await navigator.clipboard.writeText(text);
};