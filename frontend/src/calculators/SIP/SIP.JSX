import { useState } from "react";
import "./SIP.css";

import useRequireLogin from "../../hooks/useRequireLogin";

import { calculateSIP } from "./SIPUtils";
import SIPResult from "./SIPResult";
import SIPHistory from "./SIPHistory";


function SIP() {

  const checkLogin = useRequireLogin();


  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [duration, setDuration] = useState("");


  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);




  const handleCalculate = () => {


    if (!checkLogin()) return;



    const response = calculateSIP({

      monthlyInvestment,
      returnRate,
      duration,

    });





    if(!response.success){

      alert(response.message);

      return;

    }





    setResult(response.result);





    setHistory((prev)=>[

      response.result,

      ...prev

    ]);



  };







  const resetForm = ()=>{


    setMonthlyInvestment("");

    setReturnRate("");

    setDuration("");

    setResult(null);


  };







  const clearHistory = ()=>{

    setHistory([]);

  };









  return (

    <div className="sip-container">


      <h1>
        📈 SIP Calculator
      </h1>





      {/* Monthly Investment */}


      <div className="form-group">


        <label>
          Monthly Investment
        </label>


        <input

          type="number"

          placeholder="Enter Monthly SIP Amount"

          value={monthlyInvestment}

          onChange={(e)=>
            setMonthlyInvestment(e.target.value)
          }

        />


      </div>







      {/* Return Rate */}


      <div className="form-group">


        <label>
          Expected Annual Return (%)
        </label>


        <input

          type="number"

          placeholder="Enter Expected Return"

          value={returnRate}

          onChange={(e)=>
            setReturnRate(e.target.value)
          }

        />


      </div>







      {/* Duration */}


      <div className="form-group">


        <label>
          Investment Duration (Years)
        </label>


        <input

          type="number"

          placeholder="Enter Years"

          value={duration}

          onChange={(e)=>
            setDuration(e.target.value)
          }

        />


      </div>









      {/* Buttons */}


      <div className="button-group">


        <button

          className="calculate-btn"

          onClick={handleCalculate}

        >

          Calculate

        </button>






        <button

          className="reset-btn"

          onClick={resetForm}

        >

          Reset

        </button>



      </div>









      {/* Result */}


      <SIPResult

        result={result}

      />









      {/* History */}


      <SIPHistory

        history={history}

        clearHistory={clearHistory}

      />





    </div>


  );

}


export default SIP;