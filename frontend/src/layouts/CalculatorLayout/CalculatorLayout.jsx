import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CalculatorLayout.css";

const CalculatorLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="calculator-layout">

      {/* Mobile Header */}
      <header className="mobile-header">
        <button
          className="menu-btn"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </button>

        <h2>Accountra</h2>
      </header>

      {/* Dark Overlay */}
      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <Sidebar open={open} setOpen={setOpen} />

      <main
        className={`calculator-content ${
          open ? "sidebar-open" : "sidebar-close"
        }`}
      >
        {children}
      </main>

    </div>
  );
};

export default CalculatorLayout;