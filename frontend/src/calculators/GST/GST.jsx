import { useState } from "react";
import "./GST.css";

import useRequireLogin from "../../hooks/useRequireLogin";

import { calculateGST } from "./GSTUtills";
import GSTResult from "./GSTResult";
import GSTHistory from "./GSTHistory";

function GST() {

  const checkLogin = useRequireLogin();

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");
  const [calculation, setCalculation] = useState("add");
  const [taxType, setTaxType] = useState("igst");

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);


  const handleCalculate = () => {

    // Login protection
    if (!checkLogin()) return;


    const response = calculateGST({
      amount,
      rate,
      calculation,
      taxType,
    });


    if (!response.success) {
      alert(response.message);
      return;
    }


    setResult(response.result);


    setHistory((prev) => [
      {
        ...response.result,
        rate,
      },
      ...prev,
    ]);

  };


  const resetForm = () => {

    setAmount("");
    setRate("18");
    setCalculation("add");
    setTaxType("igst");
    setResult(null);

  };


  const clearHistory = () => {

    setHistory([]);

  };


  return (
    <div className="gst-container">

      <h1>🧾 GST Calculator</h1>


      {/* Amount */}

      <div className="form-group">

        <label>Amount</label>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

      </div>



      {/* GST Rate */}

      <div className="form-group">

        <label>GST Rate</label>

        <select
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        >

          <option value="0">0%</option>
          <option value="3">3%</option>
          <option value="5">5%</option>
          <option value="12">12%</option>
          <option value="18">18%</option>
          <option value="28">28%</option>

        </select>

      </div>



      {/* Calculation Mode */}

      <div className="form-group">

        <label>Calculation Mode</label>

        <select
          value={calculation}
          onChange={(e) => setCalculation(e.target.value)}
        >

          <option value="add">
            Add GST
          </option>

          <option value="remove">
            Remove GST
          </option>

          <option value="breakdown">
            GST Breakdown
          </option>

        </select>

      </div>



      {/* Tax Type */}

      {calculation === "breakdown" && (

        <div className="form-group">

          <label>Tax Type</label>

          <select
            value={taxType}
            onChange={(e) => setTaxType(e.target.value)}
          >

            <option value="igst">
              IGST
            </option>

            <option value="cgst_sgst">
              CGST + SGST
            </option>

            <option value="utgst_cgst">
              CGST + UTGST
            </option>

          </select>

        </div>

      )}




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

      <GSTResult
        result={result}
        rate={rate}
      />



      {/* History */}

      <GSTHistory
        history={history}
        clearHistory={clearHistory}
      />


    </div>
  );
}


export default GST;