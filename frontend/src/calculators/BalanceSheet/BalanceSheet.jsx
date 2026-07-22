import { useState } from "react";
import "./BalanceSheet.css";

import useRequireLogin from "../../hooks/useRequireLogin";

import { calculateBalanceSheet } from "./BalanceSheetUtils";
import BalanceSheetResult from "./BalanceSheetResult";
import BalanceSheetHistory from "./BalancesheetHistory";


function BalanceSheet() {

  const checkLogin = useRequireLogin();


  // Assets

  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
  const [inventory, setInventory] = useState("");
  const [equipment, setEquipment] = useState("");


  // Liabilities

  const [loan, setLoan] = useState("");
  const [creditors, setCreditors] = useState("");


  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);



  const handleCalculate = () => {


    if (!checkLogin()) return;


    const response = calculateBalanceSheet({

      cash,
      bank,
      inventory,
      equipment,
      loan,
      creditors

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


    setCash("");
    setBank("");
    setInventory("");
    setEquipment("");

    setLoan("");
    setCreditors("");

    setResult(null);


  };





  const clearHistory = ()=>{

    setHistory([]);

  };







  return (

    <div className="balancesheet-container">


      <h1>
        📊 Balance Sheet Calculator
      </h1>





      <h2>
        Assets
      </h2>





      <div className="form-group">

        <label>
          Cash
        </label>

        <input
          type="number"
          placeholder="Enter Cash Amount"
          value={cash}
          onChange={(e)=>setCash(e.target.value)}
        />

      </div>






      <div className="form-group">

        <label>
          Bank Balance
        </label>

        <input
          type="number"
          placeholder="Enter Bank Balance"
          value={bank}
          onChange={(e)=>setBank(e.target.value)}
        />

      </div>







      <div className="form-group">

        <label>
          Inventory
        </label>

        <input
          type="number"
          placeholder="Enter Inventory Value"
          value={inventory}
          onChange={(e)=>setInventory(e.target.value)}
        />

      </div>







      <div className="form-group">

        <label>
          Equipment
        </label>

        <input
          type="number"
          placeholder="Enter Equipment Value"
          value={equipment}
          onChange={(e)=>setEquipment(e.target.value)}
        />

      </div>







      <h2>
        Liabilities
      </h2>







      <div className="form-group">

        <label>
          Loan
        </label>

        <input
          type="number"
          placeholder="Enter Loan Amount"
          value={loan}
          onChange={(e)=>setLoan(e.target.value)}
        />

      </div>







      <div className="form-group">

        <label>
          Creditors
        </label>

        <input
          type="number"
          placeholder="Enter Creditors Amount"
          value={creditors}
          onChange={(e)=>setCreditors(e.target.value)}
        />

      </div>







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







      <BalanceSheetResult
        result={result}
      />







      <BalanceSheetHistory
        history={history}
        clearHistory={clearHistory}
      />





    </div>

  );

}


export default BalanceSheet;