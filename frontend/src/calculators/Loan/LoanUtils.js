// Loan Eligibility Calculation
export const calculateLoan = ({
  monthlyIncome,
  existingEMI,
  rate,
  tenure,
  tenureType,
}) => {

  // Validation
  if (
    !monthlyIncome ||
    !rate ||
    !tenure ||
    existingEMI === ""
  ) {
    return {
      success: false,
      message: "Please fill all fields.",
    };
  }

  const income = Number(monthlyIncome);
  const currentEMI = Number(existingEMI);
  const annualRate = Number(rate);
  let months = Number(tenure);

  if (
    income <= 0 ||
    annualRate <= 0 ||
    months <= 0 ||
    currentEMI < 0
  ) {
    return {
      success: false,
      message: "Please enter valid values.",
    };
  }

  // Convert Years → Months
  if (tenureType === "years") {
    months *= 12;
  }

  // Bank Rule
  const eligibleEMI = income * 0.5 - currentEMI;

  if (eligibleEMI <= 0) {
    return {
      success: false,
      message:
        "Based on your income and existing EMI, you are currently not eligible for a new loan.",
    };
  }

  const monthlyRate = annualRate / 12 / 100;

  // Loan Eligibility Formula
  const eligibleLoan =
    eligibleEMI *
    ((Math.pow(1 + monthlyRate, months) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, months)));

  const totalPayment = eligibleEMI * months;
  const totalInterest = totalPayment - eligibleLoan;

  return {
    success: true,

    result: {
      monthlyIncome: income,
      existingEMI: currentEMI,
      eligibleEMI,
      eligibleLoan,
      totalInterest,
      totalPayment,
      months,
    },
  };
};

// =============================
// Format Currency
// =============================

export const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// =============================
// Copy Loan Result
// =============================

export const copyLoanResult = async (result) => {
  const text = `
Loan Eligibility Report

Monthly Income : ${formatCurrency(result.monthlyIncome)}
Existing EMI : ${formatCurrency(result.existingEMI)}

Eligible EMI : ${formatCurrency(result.eligibleEMI)}

Eligible Loan : ${formatCurrency(result.eligibleLoan)}

Total Interest : ${formatCurrency(result.totalInterest)}

Total Payment : ${formatCurrency(result.totalPayment)}

Loan Duration : ${result.months} Months
`;

  await navigator.clipboard.writeText(text);
};