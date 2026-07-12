function DepreciationHistory({
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
        history.map((item, index)=>(

          <div
            className="history-item"
            key={index}
          >


            <p>
              <strong>
                Asset:
              </strong>{" "}
              {item.assetName}
            </p>


            <p>
              <strong>
                Cost:
              </strong>{" "}
              ₹ {item.purchaseCost}
            </p>


            <p>
              <strong>
                Annual Depreciation:
              </strong>{" "}
              ₹ {item.annualDepreciation}
            </p>


            <p>
              <strong>
                Life:
              </strong>{" "}
              {item.usefulLife} Years
            </p>


            <hr />


          </div>

        ))
      }



    </div>

  );

}


export default DepreciationHistory;