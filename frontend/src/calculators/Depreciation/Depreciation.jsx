import { useState } from "react";
import "./Depreciation.css";

import { calculateDepreciation } from "./DepreciationUtils";
import DepreciationResult from "./DepreciationResult";
import DepreciationHistory from "./DepreciationHistory";

function Depreciation() {

  const [assetName, setAssetName] = useState("");
  const [cost, setCost] = useState("");
  const [salvageValue, setSalvageValue] = useState("");
  const [life, setLife] = useState("");

  const [method, setMethod] = useState("straight");

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);


  const handleCalculate = () => {

    const response = calculateDepreciation({
      assetName,
      cost,
      salvageValue,
      life,
      method
    });


    if (!response.success) {
      alert(response.message);
      return;
    }


    setResult(response.result);


    setHistory((prev)=>[
      response.result,
      ...prev
    ]);

  };


  const resetForm = () => {

    setAssetName("");
    setCost("");
    setSalvageValue("");
    setLife("");
    setMethod("straight");

    setResult(null);

  };


  const clearHistory = () => {
    setHistory([]);
  };


  return (

    <div className="depreciation-container">

      <h1>
        📉 Depreciation Calculator
      </h1>


      {/* Asset Name */}

      <div className="form-group">

        <label>
          Asset Name
        </label>

        <input
          type="text"
          placeholder="Enter Asset Name"
          value={assetName}
          onChange={(e)=>setAssetName(e.target.value)}
        />

      </div>



      {/* Purchase Cost */}

      <div className="form-group">

        <label>
          Purchase Price
        </label>

        <input
          type="number"
          placeholder="Enter Purchase Price"
          value={cost}
          onChange={(e)=>setCost(e.target.value)}
        />

      </div>



      {/* Salvage Value */}

      <div className="form-group">

        <label>
          Salvage Value
        </label>

        <input
          type="number"
          placeholder="Enter Salvage Value"
          value={salvageValue}
          onChange={(e)=>setSalvageValue(e.target.value)}
        />

      </div>



      {/* Life */}

      <div className="form-group">

        <label>
          Useful Life (Years)
        </label>

        <input
          type="number"
          placeholder="Enter Life"
          value={life}
          onChange={(e)=>setLife(e.target.value)}
        />

      </div>



      {/* Method */}

      <div className="form-group">

        <label>
          Depreciation Method
        </label>

        <select
          value={method}
          onChange={(e)=>setMethod(e.target.value)}
        >

          <option value="straight">
            Straight Line Method
          </option>

        </select>

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

      <DepreciationResult
        result={result}
      />



      {/* History */}

      <DepreciationHistory
        history={history}
        clearHistory={clearHistory}
      />


    </div>

  );
}


export default Depreciation;