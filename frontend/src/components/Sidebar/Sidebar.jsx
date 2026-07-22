import {
  FaHome,
  FaCalculator,
  FaReceipt,
  FaMoneyBillWave,
  FaUniversity,
  FaChartLine,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaArrowLeft,
  FaMobile,
  FaFileInvoice,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "./Sidebar.css";


const Sidebar = ({ open, setOpen }) => {


  const menuItems = [

    {
      name: "All Calculators",
      icon: <FaCalculator />,
      path: "/calculators",
    },


    {
      name: "GST",
      icon: <FaReceipt />,
      path: "/calculators/gst",
    },


    {
      name: "EMI",
      icon: <FaMoneyBillWave />,
      path: "/calculators/emi",
    },


    {
      name: "Loan",
      icon: <FaUniversity />,
      path: "/calculators/loan",
    },


    {
      name: "Interest",
      icon: <FaChartLine />,
      path: "/calculators/interest",
    },


    {
      name: "SIP",
      icon: <FaChartLine />,
      path: "/calculators/sip",
    },


    {
      name: "TDS",
      icon: <FaMoneyCheckAlt />,
      path: "/calculators/tds",
    },


    {
      name: "Income Tax",
      icon: <FaFileInvoiceDollar />,
      path: "/calculators/income-tax",
    },


    {
      name: "Salary",
      icon: <FaMobile />,
      path: "/calculators/salary",
    },


    {
      name: "Balance Sheet",
      icon: <FaUniversity />,
      path: "/calculators/balance-sheet",
    },


    {
      name: "Billing",
      icon: <FaFileInvoice />,
      path: "/calculators/billing",
    },


    {
      name: "Depreciation",
      icon: <FaChartLine />,
      path: "/calculators/depreciation",
    },


    {
      name: "Profit & Loss",
      icon: <FaMoneyCheckAlt />,
      path: "/calculators/profit-loss",
    },

  ];



  return (

    <aside
      className={`sidebar ${open ? "open" : ""}`}

      onMouseEnter={() =>
        window.innerWidth > 768 && setOpen(true)
      }

      onMouseLeave={() =>
        window.innerWidth > 768 && setOpen(false)
      }
    >



      {/* Logo */}

      <div className="sidebar-logo">

        <NavLink
          to="/"
          className="logo-link"
        >

          <div className="logo-circle">
            A
          </div>


          {open && (

            <div>

              <h2>
                Accountra
              </h2>

              <p>
                Finance Toolkit
              </p>

            </div>

          )}

        </NavLink>

      </div>





      {/* Navigation */}

      <nav className="sidebar-menu">


        {menuItems.map((item) => (

          <NavLink

            key={item.path}

            to={item.path}

            end={item.path === "/calculators"}

            className={({ isActive }) =>
              isActive
                ? "menu-link active"
                : "menu-link"
            }

          >

            <span className="icon">

              {item.icon}

            </span>


            {open && (

              <span>
                {item.name}
              </span>

            )}


          </NavLink>


        ))}


      </nav>






      {/* Footer */}

      <div className="sidebar-footer">


        <NavLink
          to="/"
          className="menu-link"
        >

          <span className="icon">

            <FaArrowLeft />

          </span>


          {open && (

            <span>
              Back Home
            </span>

          )}


        </NavLink>


      </div>




    </aside>

  );

};


export default Sidebar;