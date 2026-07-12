// ==============================
// Balance Sheet Calculation
// ==============================

export const calculateBalanceSheet = ({
  cash,
  bank,
  inventory,
  equipment,
  loan,
  creditors
}) => {



  // Convert values

  const cashAmount = Number(cash) || 0;

  const bankAmount = Number(bank) || 0;

  const inventoryAmount = Number(inventory) || 0;

  const equipmentAmount = Number(equipment) || 0;



  const loanAmount = Number(loan) || 0;

  const creditorsAmount = Number(creditors) || 0;





  // Total Assets

  const totalAssets =
    cashAmount +
    bankAmount +
    inventoryAmount +
    equipmentAmount;






  // Total Liabilities

  const totalLiabilities =
    loanAmount +
    creditorsAmount;






  // Owner Equity

  const ownerEquity =
    totalAssets - totalLiabilities;







  return {


    success:true,


    result:{


      cash: cashAmount,

      bank: bankAmount,

      inventory: inventoryAmount,

      equipment: equipmentAmount,



      loan: loanAmount,

      creditors: creditorsAmount,



      totalAssets,

      totalLiabilities,

      ownerEquity


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
// Copy Balance Sheet Result
// ==============================

export const copyBalanceSheetResult = async(result)=>{


  const text = `

Balance Sheet Report


Total Assets:
${formatCurrency(result.totalAssets)}


Total Liabilities:
${formatCurrency(result.totalLiabilities)}


Owner Equity:
${formatCurrency(result.ownerEquity)}

`;



  await navigator.clipboard.writeText(text);


};