import { formatCurrency } from "./BalanceSheetUtils";


function BalanceSheetHistory({
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
          Balance Sheet History
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
                Total Assets:
              </strong>{" "}

              {formatCurrency(item.totalAssets)}

            </p>





            <p>

              <strong>
                Total Liabilities:
              </strong>{" "}

              {formatCurrency(item.totalLiabilities)}

            </p>





            <p>

              <strong>
                Owner Equity:
              </strong>{" "}

              {formatCurrency(item.ownerEquity)}

            </p>





            <hr />


          </div>



        ))
      }






    </div>


  );

}



export default BalanceSheetHistory;