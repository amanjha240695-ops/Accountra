import jsPDF from "jspdf";

import {
  formatCurrency,
  copySIPResult
} from "./SIPUtils";



function SIPResult({ result }) {


  if (!result) return null;




  // Copy

  const handleCopy = async()=>{


    await copySIPResult(result);

    alert("Result copied successfully!");

  };






  // PDF

  const downloadPDF = ()=>{


    const doc = new jsPDF();



    doc.setFontSize(22);

    doc.text(
      "Accountra SIP Report",
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
      "Monthly Investment",
      formatCurrency(result.monthlyInvestment)
    );



    addRow(
      "Annual Return",
      `${result.annualReturn}%`
    );



    addRow(
      "Duration",
      `${result.duration} Years`
    );



    addRow(
      "Invested Amount",
      formatCurrency(result.investedAmount)
    );



    addRow(
      "Estimated Returns",
      formatCurrency(result.estimatedReturns)
    );



    addRow(
      "Future Value",
      formatCurrency(result.futureValue)
    );



    doc.save(
      "SIP_Report.pdf"
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

      title:"SIP Calculation",

      text:`

Monthly Investment:
${formatCurrency(result.monthlyInvestment)}

Invested Amount:
${formatCurrency(result.investedAmount)}

Estimated Returns:
${formatCurrency(result.estimatedReturns)}

Future Value:
${formatCurrency(result.futureValue)}

      `

    });


  };







  return (

    <div className="result-card">


      <h2>
        SIP Result
      </h2>




      <div className="result-row">

        <span>
          Monthly Investment
        </span>


        <span>
          {formatCurrency(result.monthlyInvestment)}
        </span>

      </div>





      <div className="result-row">

        <span>
          Annual Return
        </span>


        <span>
          {result.annualReturn}%
        </span>

      </div>






      <div className="result-row">

        <span>
          Investment Duration
        </span>


        <span>
          {result.duration} Years
        </span>

      </div>






      <div className="result-row">

        <span>
          Total Invested Amount
        </span>


        <span>
          {formatCurrency(result.investedAmount)}
        </span>

      </div>






      <div className="result-row">

        <span>
          Estimated Returns
        </span>


        <span>
          {formatCurrency(result.estimatedReturns)}
        </span>

      </div>






      <div className="result-row total">

        <span>
          Future Value
        </span>


        <span>
          {formatCurrency(result.futureValue)}
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



export default SIPResult;