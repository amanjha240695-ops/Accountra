import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaCalculator,
  FaMoneyBillWave,
  FaUniversity,
  FaPercentage,
  FaChartLine,
  FaArrowLeft,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "GST", icon: <FaCalculator />, path: "/calculators/gst" },
    { name: "EMI", icon: <FaMoneyBillWave />, path: "/calculators/emi" },
    { name: "Loan", icon: <FaUniversity />, path: "/calculators/loan" },
    { name: "Interest", icon: <FaChartLine />, path: "/calculators/interest" },
    { name: "Percentage", icon: <FaPercentage />, path: "/calculators/percentage" },
  ];

  return (
    <aside
  className={collapsed ? "sidebar collapsed" : "sidebar"}
  onMouseEnter={() => setCollapsed(false)}
  onMouseLeave={() => setCollapsed(true)}
>
      {/* Header */}
      <div className="sidebar-header">
  <div className="logo">
    <span className="logo-icon">📊</span>

    {!collapsed && <h2>Accountra</h2>}
  </div>
</div>

      {/* Menu */}
      <nav>
        {menuItems.map((item) => (
          <NavLink
  key={item.name}
  to={item.path}
  data-title={item.name}
  className={({ isActive }) =>
    isActive ? "menu active" : "menu"
  }
>
            <span className="icon">{item.icon}</span>

            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <NavLink to="/" className="menu">
          <span className="icon">
            <FaArrowLeft />
          </span>

          {!collapsed && <span>Back Home</span>}
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;