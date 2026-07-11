// ==============================
// Calculate Income Tax
// ==============================

export const calculateIncomeTax = ({
  income,
  regime,
}) => {
  if (!income) {
    return {
      success: false,
      message: "Please enter annual income.",
    };
  }

  const annualIncome = Number(income);

  if (annualIncome <= 0) {
    return {
      success: false,
      message: "Income must be greater than zero.",
    };
  }

  let tax = 0;

  // ==============================
  // NEW TAX REGIME
  // ==============================

  if (regime === "new") {
    if (annualIncome <= 400000) {
      tax = 0;
    } else if (annualIncome <= 800000) {
      tax = (annualIncome - 400000) * 0.05;
    } else if (annualIncome <= 1200000) {
      tax =
        20000 +
        (annualIncome - 800000) * 0.10;
    } else if (annualIncome <= 1600000) {
      tax =
        60000 +
        (annualIncome - 1200000) * 0.15;
    } else if (annualIncome <= 2000000) {
      tax =
        120000 +
        (annualIncome - 1600000) * 0.20;
    } else if (annualIncome <= 2400000) {
      tax =
        200000 +
        (annualIncome - 2000000) * 0.25;
    } else {
      tax =
        300000 +
        (annualIncome - 2400000) * 0.30;
    }
  }

  // ==============================
  // OLD TAX REGIME
  // ==============================

  else {
    if (annualIncome <= 250000) {
      tax = 0;
    } else if (annualIncome <= 500000) {
      tax = (annualIncome - 250000) * 0.05;
    } else if (annualIncome <= 1000000) {
      tax =
        12500 +
        (annualIncome - 500000) * 0.20;
    } else {
      tax =
        112500 +
        (annualIncome - 1000000) * 0.30;
    }
  }

  const effectiveRate =
    (tax / annualIncome) * 100;

  return {
    success: true,

    result: {
      annualIncome,
      regime:
        regime === "new"
          ? "New Tax Regime"
          : "Old Tax Regime",

      taxableIncome: annualIncome,

      incomeTax: tax,

      effectiveRate,
    },
  };
};

// ==============================
// Format Currency
// ==============================

export const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`;
};

// ==============================
// Copy Result
// ==============================

export const copyIncomeTaxResult =
  async (result) => {
    const text = `
Income Tax Report

Annual Income : ${formatCurrency(
      result.annualIncome
    )}

Tax Regime : ${result.regime}

Taxable Income : ${formatCurrency(
      result.taxableIncome
    )}

Income Tax : ${formatCurrency(
      result.incomeTax
    )}

Effective Tax Rate : ${result.effectiveRate.toFixed(
      2
    )}%
`;

    await navigator.clipboard.writeText(
      text
    );
  };