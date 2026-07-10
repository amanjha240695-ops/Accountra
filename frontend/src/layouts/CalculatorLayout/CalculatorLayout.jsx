import Sidebar from "../../components/Sidebar/Sidebar";
import "./CalculatorLayout.css";

function CalculatorLayout ({children}) {
  return (
    <div className="calculator-layout">
      <Sidebar/>

      <main className="calculator-content">
        {children}
      </main>
    </div>
  );
}

export default CalculatorLayout;