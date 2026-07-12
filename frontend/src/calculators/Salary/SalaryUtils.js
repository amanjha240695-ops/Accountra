// ==============================
// Calculate Salary
// ==============================

export const calculateSalary = ({
  basicSalary,
  hra,
  allowances,
  deductions,
}) => {
  if (
    !basicSalary &&
    basicSalary !== 0 ||
    !hra &&
    hra !== 0 ||
    !allowances &&
    allowances !== 0 ||
    !deductions &&
    deductions !== 0
  ) {
    return {
      success: false,
      message: "Please fill all fields.",
    };
  }

  const basic = Number(basicSalary);
  const houseRent = Number(hra);
  const otherAllowances = Number(allowances);
  const totalDeductions = Number(deductions);

  if (
    basic < 0 ||
    houseRent < 0 ||
    otherAllowances < 0 ||
    totalDeductions < 0
  ) {
    return {
      success: false,
      message: "Values cannot be negative.",
    };
  }

  // Gross Salary
  const grossSalary =
    basic + houseRent + otherAllowances;

  // Net Salary
  const netSalary =
    grossSalary - totalDeductions;

  return {
    success: true,

    result: {
      basicSalary: basic,
      hra: houseRent,
      allowances: otherAllowances,
      deductions: totalDeductions,
      grossSalary,
      netSalary,
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

export const copySalaryResult = async (result) => {
  const text = `
Salary Calculation Report

Basic Salary : ${formatCurrency(result.basicSalary)}

HRA : ${formatCurrency(result.hra)}

Other Allowances : ${formatCurrency(result.allowances)}

Gross Salary : ${formatCurrency(result.grossSalary)}

Total Deductions : ${formatCurrency(result.deductions)}

Net Salary : ${formatCurrency(result.netSalary)}
`;

  await navigator.clipboard.writeText(text);
};