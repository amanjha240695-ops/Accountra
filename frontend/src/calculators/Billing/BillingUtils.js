// ==============================
// Billing Calculation
// ==============================

export const calculateBilling = ({
  customerName,
  productName,
  quantity,
  price,
  discount,
  gst
}) => {


  // Validation

  if (
    !customerName ||
    !productName ||
    !quantity ||
    !price
  ) {

    return {
      success: false,
      message: "Please fill all fields.",
    };

  }



  const qty = Number(quantity);

  const unitPrice = Number(price);

  const discountRate = Number(discount);

  const gstRate = Number(gst);




  if (
    qty <= 0 ||
    unitPrice <= 0
  ) {

    return {
      success: false,
      message: "Values must be greater than zero.",
    };

  }




  // Calculations


  const subtotal =
    qty * unitPrice;



  const discountAmount =
    (subtotal * discountRate) / 100;



  const taxableAmount =
    subtotal - discountAmount;



  const gstAmount =
    (taxableAmount * gstRate) / 100;



  const finalAmount =
    taxableAmount + gstAmount;




  return {

    success:true,


    result:{


      customerName,

      productName,


      quantity: qty,


      price: unitPrice,


      discount: discountRate,


      gst: gstRate,


      subtotal,


      discountAmount,


      taxableAmount,


      gstAmount,


      finalAmount


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
// Copy Billing Result
// ==============================

export const copyBillingResult = async(result)=>{


  const text = `

Customer Name:
${result.customerName}


Product:
${result.productName}


Quantity:
${result.quantity}


Subtotal:
${formatCurrency(result.subtotal)}


Discount:
${formatCurrency(result.discountAmount)}


GST:
${formatCurrency(result.gstAmount)}


Final Amount:
${formatCurrency(result.finalAmount)}

`;



  await navigator.clipboard.writeText(text);


};