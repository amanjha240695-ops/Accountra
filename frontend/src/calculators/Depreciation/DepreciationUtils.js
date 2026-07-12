// ==============================
// Depreciation Calculation
// ==============================

export const calculateDepreciation = ({
  assetName,
  cost,
  salvageValue,
  life,
  method,
}) => {


  // Validation

  if (
    !assetName ||
    !cost ||
    !salvageValue ||
    !life
  ) {

    return {
      success: false,
      message: "Please fill all fields.",
    };

  }



  const purchaseCost = Number(cost);
  const salvage = Number(salvageValue);
  const years = Number(life);



  if (
    purchaseCost <= 0 ||
    salvage < 0 ||
    years <= 0
  ) {

    return {
      success: false,
      message: "Values must be valid.",
    };

  }



  if (purchaseCost <= salvage) {

    return {
      success: false,
      message:
        "Purchase price must be greater than salvage value.",
    };

  }



  let annualDepreciation = 0;



  // Straight Line Method

  if (method === "straight") {

    annualDepreciation =
      (purchaseCost - salvage) / years;

  }



  let remainingValue = purchaseCost;


  const yearlyData = [];



  for(let year = 1; year <= years; year++){


    remainingValue =
      remainingValue - annualDepreciation;



    yearlyData.push({

      year,

      depreciation:
        annualDepreciation,

      remainingValue:
        remainingValue < salvage
          ? salvage
          : remainingValue,

    });


  }




  return {

    success:true,

    result:{

      assetName,

      purchaseCost,

      salvageValue: salvage,

      usefulLife: years,

      method,

      annualDepreciation,

      yearlyData,

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
// Copy Depreciation Result
// ==============================

export const copyDepreciationResult = async(result)=>{


  const text = `

Asset Name : ${result.assetName}

Purchase Price : ${formatCurrency(result.purchaseCost)}

Salvage Value : ${formatCurrency(result.salvageValue)}

Useful Life : ${result.usefulLife} Years

Annual Depreciation : ${formatCurrency(result.annualDepreciation)}

`;



  await navigator.clipboard.writeText(text);


};