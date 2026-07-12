function SIPHistory({
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
          Calculation History
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
                Monthly SIP:
              </strong>{" "}

              ₹ {item.monthlyInvestment}

            </p>




            <p>

              <strong>
                Duration:
              </strong>{" "}

              {item.duration} Years

            </p>





            <p>

              <strong>
                Invested Amount:
              </strong>{" "}

              ₹ {item.investedAmount.toFixed(2)}

            </p>





            <p>

              <strong>
                Future Value:
              </strong>{" "}

              ₹ {item.futureValue.toFixed(2)}

            </p>





            <hr />


          </div>


        ))
      }





    </div>


  );

}



export default SIPHistory;