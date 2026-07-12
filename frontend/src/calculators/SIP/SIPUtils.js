// ==============================
// SIP Calculation
// ==============================

export const calculateSIP = ({
  monthlyInvestment,
  returnRate,
  duration,
}) => {


  // Validation

  if (
    !monthlyInvestment ||
    !returnRate ||
    !duration
  ) {

    return {
      success: false,
      message: "Please fill all fields.",
    };

  }



  const monthlyAmount = Number(monthlyInvestment);

  const annualReturn = Number(returnRate);

  const years = Number(duration);



  if (
    monthlyAmount <= 0 ||
    annualReturn <= 0 ||
    years <= 0
  ) {

    return {
      success: false,
      message: "Values must be greater than zero.",
    };

  }



  const months = years * 12;



  const monthlyRate =
    annualReturn / 12 / 100;



  // SIP Formula

  const futureValue =
    monthlyAmount *
    (
      ((Math.pow(1 + monthlyRate, months) - 1) /
      monthlyRate)
    ) *
    (1 + monthlyRate);




  const investedAmount =
    monthlyAmount * months;



  const estimatedReturns =
    futureValue - investedAmount;




  return {

    success:true,

    result:{

      monthlyInvestment: monthlyAmount,

      annualReturn,

      duration: years,

      months,

      investedAmount,

      estimatedReturns,

      futureValue,

    }

  };


};





// ==============================
// Format Currency
// ==============================

export const formatCurrency = (amount)=>{


  return `₹${Number(amount).toLocaleString("en-IN",{

    minimumFractionDigits:2,

    maximumFractionDigits:2,

  })}`;


};





// ==============================
// Copy SIP Result
// ==============================

export const copySIPResult = async(result)=>{


  const text = `

Monthly Investment :
${formatCurrency(result.monthlyInvestment)}

Investment Duration :
${result.duration} Years

Total Invested Amount :
${formatCurrency(result.investedAmount)}

Estimated Returns :
${formatCurrency(result.estimatedReturns)}

Future Value :
${formatCurrency(result.futureValue)}

`;



  await navigator.clipboard.writeText(text);


};