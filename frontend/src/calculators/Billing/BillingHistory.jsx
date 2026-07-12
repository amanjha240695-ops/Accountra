import { formatCurrency } from "./BillingUtils";


function BillingHistory({
  history,
  clearHistory
}) {


  if (history.length === 0) {
    return null;
  }



  return (

    <div className="history-card">


      <div className="history-header">


        <h2>
          Invoice History
        </h2>



        <button

          className="clear-btn"

          onClick={clearHistory}

        >

          Clear

        </button>


      </div>







      {
        history.map((item,index)=>(


          <div

            className="history-item"

            key={index}

          >



            <p>

              <strong>
                Customer:
              </strong>{" "}

              {item.customerName}

            </p>





            <p>

              <strong>
                Product:
              </strong>{" "}

              {item.productName}

            </p>





            <p>

              <strong>
                Final Amount:
              </strong>{" "}

              {formatCurrency(item.finalAmount)}

            </p>





            <p>

              <strong>
                GST:
              </strong>{" "}

              {formatCurrency(item.gstAmount)}

            </p>





            <hr />



          </div>



        ))
      }





    </div>


  );

}



export default BillingHistory;