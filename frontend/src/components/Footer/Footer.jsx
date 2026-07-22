import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="ft-footer">
      <div className="ft-container">
        {/* Brand */}
        <div className="ft-brand">
          <h2>Accountra</h2>
          <p>
            Smart financial calculators for GST, TDS, Income Tax, EMI,
            Accounting, and Business planning.
          </p>
        </div>

        {/* Calculators */}
        <div className="ft-links">
          <h3>Calculators</h3>
          <Link to="/calculators/gst">GST Calculator</Link>
          <Link to="/calculators/tds">TDS Calculator</Link>
          <Link to="/calculators/income-tax">Income Tax Calculator</Link>
          <Link to="/calculators/emi">EMI Calculator</Link>
          <Link to="/calculators/sip">SIP Calculator</Link>
        </div>

        {/* Business Tools */}
        <div className="ft-links">
          <h3>Business Tools</h3>
          <Link to="/calculators/salary">Salary Calculator</Link>
          <Link to="/calculators/profit-loss">Profit & Loss</Link>
          <Link to="/calculators/billing">Billing Calculator</Link>
          <Link to="/calculators/balance-sheet">Balance Sheet</Link>
          <Link to="/calculators/depreciation">Depreciation</Link>
        </div>

        {/* Company */}
        <div className="ft-links">
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/feedback">Feedback</Link>
        </div>
      </div>

      {/* Update Banner */}
      <div className="ft-update">
        <span>🚀 Tax Update Promise:</span>
        Government tax changes are verified and calculators are updated within{" "}
        <strong>3 days</strong>
      </div>

      {/* Bottom */}
      <div className="ft-bottom">
        <p>© 2026 Accountra. All Rights Reserved.</p>
        <p>Built with ❤️ for smarter financial decisions.</p>
      </div>
    </footer>
  );
}

export default Footer;