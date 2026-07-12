import jsPDF from "jspdf";

import {
  formatCurrency,
  copyBillingResult
} from "./BillingUtils";



function BillingResult({ result }) {


  if (!result) return null;




  // Copy

  const handleCopy = async()=>{


    await copyBillingResult(result);

    alert("Invoice copied successfully!");

  };







  // PDF

  const downloadPDF = ()=>{


    const doc = new jsPDF();



    doc.setFontSize(22);

    doc.text(
      "Accountra Billing Invoice",
      20,
      20
    );



    doc.setFontSize(14);



    let y = 40;



    const addRow = (label,value)=>{


      doc.text(
        label,
        20,
        y
      );


      doc.text(
        String(value),
        120,
        y
      );


      y += 10;


    };





    addRow(
      "Customer",
      result.customerName
    );



    addRow(
      "Product",
      result.productName
    );



    addRow(
      "Quantity",
      result.quantity
    );



    addRow(
      "Price",
      formatCurrency(result.price)
    );



    addRow(
      "Subtotal",
      formatCurrency(result.subtotal)
    );



    addRow(
      "Discount",
      formatCurrency(result.discountAmount)
    );



    addRow(
      "GST",
      formatCurrency(result.gstAmount)
    );



    addRow(
      "Final Amount",
      formatCurrency(result.finalAmount)
    );




    doc.save(
      "Billing_Invoice.pdf"
    );


  };







  // Print

  const handlePrint = ()=>{

    window.print();

  };








  // Share

  const handleShare = async()=>{


    if(!navigator.share){

      alert(
        "Sharing is not supported on this browser."
      );

      return;

    }




    await navigator.share({


      title:"Billing Invoice",


      text:`

Customer:
${result.customerName}


Product:
${result.productName}


Final Amount:
${formatCurrency(result.finalAmount)}

      `


    });



  };








  return (

    <div className="result-card">


      <h2>
        Billing Result
      </h2>





      <div className="result-row">

        <span>
          Customer Name
        </span>

        <span>
          {result.customerName}
        </span>

      </div>






      <div className="result-row">

        <span>
          Product Name
        </span>

        <span>
          {result.productName}
        </span>

      </div>






      <div className="result-row">

        <span>
          Quantity
        </span>

        <span>
          {result.quantity}
        </span>

      </div>






      <div className="result-row">

        <span>
          Subtotal
        </span>

        <span>
          {formatCurrency(result.subtotal)}
        </span>

      </div>






      <div className="result-row">

        <span>
          Discount
        </span>

        <span>
          {formatCurrency(result.discountAmount)}
        </span>

      </div>







      <div className="result-row">

        <span>
          GST
        </span>

        <span>
          {formatCurrency(result.gstAmount)}
        </span>

      </div>







      <div className="result-row total">

        <span>
          Final Amount
        </span>

        <span>
          {formatCurrency(result.finalAmount)}
        </span>

      </div>







      <div className="result-buttons">


        <button
          className="copy-btn"
          onClick={handleCopy}
        >
          📋 Copy
        </button>




        <button
          className="pdf-btn"
          onClick={downloadPDF}
        >
          📄 PDF
        </button>




        <button
          className="print-btn"
          onClick={handlePrint}
        >
          🖨 Print
        </button>




        <button
          className="share-btn"
          onClick={handleShare}
        >
          🔗 Share
        </button>



      </div>




    </div>

  );

}



export default BillingResult;