// ==============================
// Calculate Interest
// ==============================

export const calculateInterest = ({
  principal,
  rate,
  time,
  timeType,
  interestType,
  frequency,
}) => {
  if (!principal || !rate || !time) {
    return {
      success: false,
      message: "Please fill all fields.",
    };
  }

  const P = Number(principal);
  const R = Number(rate);
  let T = Number(time);

  if (P <= 0 || R <= 0 || T <= 0) {
    return {
      success: false,
      message: "Values must be greater than zero.",
    };
  }

  // Convert months to years
  if (timeType === "months") {
    T = T / 12;
  }

  let interest = 0;
  let totalAmount = 0;

  // ==============================
  // SIMPLE INTEREST
  // ==============================

  if (interestType === "simple") {
    interest = (P * R * T) / 100;
    totalAmount = P + interest;
  }

  // ==============================
  // COMPOUND INTEREST
  // ==============================

  else {
    let n = 1;

    switch (frequency) {
      case "half-yearly":
        n = 2;
        break;

      case "quarterly":
        n = 4;
        break;

      case "monthly":
        n = 12;
        break;

      default:
        n = 1;
    }

    totalAmount =
      P * Math.pow(1 + R / (100 * n), n * T);

    interest = totalAmount - P;
  }

  return {
    success: true,

    result: {
      principal: P,
      rate: R,
      time: T,
      interestType,
      frequency,
      interest,
      totalAmount,
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

export const copyInterestResult = async (result) => {
  const text = `
Interest Calculation Report

Principal : ${formatCurrency(result.principal)}

Interest Rate : ${result.rate}%

Interest Type : ${result.interestType}

Interest Earned : ${formatCurrency(result.interest)}

Total Amount : ${formatCurrency(result.totalAmount)}
`;

  await navigator.clipboard.writeText(text);
};