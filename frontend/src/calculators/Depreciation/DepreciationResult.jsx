import jsPDF from "jspdf";
import { formatCurrency, copyDepreciationResult } from "./DepreciationUtils";


function DepreciationResult({ result }) {


  if (!result) return null;



  // Copy Result

  const handleCopy = async () => {

    await copyDepreciationResult(result);

    alert("Result copied successfully!");

  };



  // Download PDF

  const downloadPDF = () => {


    const doc = new jsPDF();


    doc.setFontSize(22);

    doc.text(
      "Accountra Depreciation Report",
      20,
      20
    );


    doc.setFontSize(14);


    let y = 40;


    const addRow = (label, value)=>{

      doc.text(label,20,y);

      doc.text(
        String(value),
        120,
        y
      );

      y += 10;

    };



    addRow(
      "Asset Name",
      result.assetName
    );


    addRow(
      "Purchase Price",
      formatCurrency(result.purchaseCost)
    );


    addRow(
      "Salvage Value",
      formatCurrency(result.salvageValue)
    );


    addRow(
      "Useful Life",
      `${result.usefulLife} Years`
    );


    addRow(
      "Annual Depreciation",
      formatCurrency(result.annualDepreciation)
    );



    y += 10;


    doc.text(
      "Year Wise Depreciation",
      20,
      y
    );


    y += 10;



    result.yearlyData.forEach((item)=>{


      doc.text(
        `Year ${item.year}: ${formatCurrency(item.depreciation)} | Remaining: ${formatCurrency(item.remainingValue)}`,
        20,
        y
      );


      y += 10;


    });



    doc.save(
      "Depreciation_Report.pdf"
    );


  };



  // Print

  const handlePrint = () => {

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

      title:"Depreciation Calculation",

      text:`

Asset: ${result.assetName}

Purchase Price:
${formatCurrency(result.purchaseCost)}

Annual Depreciation:
${formatCurrency(result.annualDepreciation)}

Useful Life:
${result.usefulLife} Years

      `

    });


  };




  return (

    <div className="result-card">


      <h2>
        Depreciation Result
      </h2>



      <div className="result-row">

        <span>
          Asset Name
        </span>

        <span>
          {result.assetName}
        </span>

      </div>



      <div className="result-row">

        <span>
          Purchase Price
        </span>

        <span>
          {formatCurrency(result.purchaseCost)}
        </span>

      </div>



      <div className="result-row">

        <span>
          Salvage Value
        </span>

        <span>
          {formatCurrency(result.salvageValue)}
        </span>

      </div>



      <div className="result-row">

        <span>
          Useful Life
        </span>

        <span>
          {result.usefulLife} Years
        </span>

      </div>



      <div className="result-row total">

        <span>
          Annual Depreciation
        </span>

        <span>
          {formatCurrency(result.annualDepreciation)}
        </span>

      </div>




      <h2>
        Year Wise Depreciation
      </h2>



      <table className="depreciation-table">

        <thead>

          <tr>

            <th>
              Year
            </th>

            <th>
              Depreciation
            </th>

            <th>
              Remaining Value
            </th>

          </tr>

        </thead>



        <tbody>

        {
          result.yearlyData.map((item)=>(

            <tr key={item.year}>

              <td>
                {item.year}
              </td>


              <td>
                {formatCurrency(item.depreciation)}
              </td>


              <td>
                {formatCurrency(item.remainingValue)}
              </td>


            </tr>

          ))
        }

        </tbody>


      </table>




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


export default DepreciationResult;