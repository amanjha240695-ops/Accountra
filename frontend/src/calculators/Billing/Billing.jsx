import { useState } from "react";
import "./Billing.css";

import useRequireLogin from "../../hooks/useRequireLogin";

import { calculateBilling } from "./BillingUtils";
import BillingResult from "./BillingResult";
import BillingHistory from "./BillingHistory";


function Billing() {

  const checkLogin = useRequireLogin();


  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");

  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [discount, setDiscount] = useState("0");
  const [gst, setGst] = useState("18");


  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);




  const handleCalculate = () => {


    if (!checkLogin()) return;



    const response = calculateBilling({

      customerName,
      productName,
      quantity,
      price,
      discount,
      gst

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


    setCustomerName("");
    setProductName("");
    setQuantity("");
    setPrice("");
    setDiscount("0");
    setGst("18");

    setResult(null);


  };






  const clearHistory = ()=>{

    setHistory([]);

  };







  return (

    <div className="billing-container">


      <h1>
        🧾 Billing Calculator
      </h1>





      <div className="form-group">

        <label>
          Customer Name
        </label>

        <input
          type="text"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={(e)=>setCustomerName(e.target.value)}
        />

      </div>







      <div className="form-group">

        <label>
          Product / Service Name
        </label>

        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e)=>setProductName(e.target.value)}
        />

      </div>







      <div className="form-group">

        <label>
          Quantity
        </label>

        <input
          type="number"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e)=>setQuantity(e.target.value)}
        />

      </div>







      <div className="form-group">

        <label>
          Price Per Unit
        </label>

        <input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

      </div>







      <div className="form-group">

        <label>
          Discount (%)
        </label>

        <input
          type="number"
          value={discount}
          onChange={(e)=>setDiscount(e.target.value)}
        />

      </div>







      <div className="form-group">

        <label>
          GST (%)
        </label>

        <select
          value={gst}
          onChange={(e)=>setGst(e.target.value)}
        >

          <option value="0">0%</option>
          <option value="5">5%</option>
          <option value="12">12%</option>
          <option value="18">18%</option>
          <option value="28">28%</option>

        </select>

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







      <BillingResult
        result={result}
      />






      <BillingHistory
        history={history}
        clearHistory={clearHistory}
      />




    </div>

  );

}


export default Billing;