// EMI Calculation
export const calculateEMI = ({
  amount,
  rate,
  tenure,
  tenureType,
}) => {

  // Validation
  if (!amount || !rate || !tenure) {
    return {
      success: false,
      message: "Please fill all fields.",
    };
  }

  const principal = Number(amount);
  const annualRate = Number(rate);
  let months = Number(tenure);

  if (principal <= 0 || annualRate <= 0 || months <= 0) {
    return {
      success: false,
      message: "Values must be greater than zero.",
    };
  }

  if (tenureType === "years") {
    months *= 12;
  }

  const monthlyRate = annualRate / 12 / 100;

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    success: true,
    result: {
      loanAmount: principal,
      monthlyEMI: emi,
      totalInterest,
      totalPayment,
      months,
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
// Copy EMI Result
// ==============================

export const copyEMIResult = async (result) => {
  const text = `
Loan Amount : ${formatCurrency(result.loanAmount)}
Monthly EMI : ${formatCurrency(result.monthlyEMI)}
Total Interest : ${formatCurrency(result.totalInterest)}
Total Payment : ${formatCurrency(result.totalPayment)}
Loan Duration : ${result.months} Months
`;

  await navigator.clipboard.writeText(text);
};