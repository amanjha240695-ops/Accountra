import "./Footer.css";


function Footer() {


  return (

    <footer className="footer">


      <div className="footer-container">





        {/* Brand */}

        <div className="footer-brand">


          <h2>
            Accountra
          </h2>


          <p>

            Smart financial calculators for GST,
            TDS, Income Tax, EMI, Accounting and
            Business planning.

          </p>


        </div>








        {/* Calculators */}

        <div className="footer-links">


          <h3>
            Calculators
          </h3>


          <a href="#">
            GST Calculator
          </a>


          <a href="#">
            TDS Calculator
          </a>


          <a href="#">
            Income Tax Calculator
          </a>


          <a href="#">
            EMI Calculator
          </a>


          <a href="#">
            SIP Calculator
          </a>


        </div>








        {/* Business */}

        <div className="footer-links">


          <h3>
            Business Tools
          </h3>


          <a href="#">
            Salary Calculator
          </a>


          <a href="#">
            Profit & Loss
          </a>


          <a href="#">
            Billing Calculator
          </a>


          <a href="#">
            Balance Sheet
          </a>


          <a href="#">
            Depreciation
          </a>


        </div>








        {/* Company */}

        <div className="footer-links">

          <h3>
            Company
          </h3>


          <a href="../about">
            About Us
          </a>


          <a href="#">
            Contact
          </a>


          <a href="about">
            Privacy Policy
          </a>


          <a href="">
            Disclaimer
          </a>
        </div>
      </div>

      {/* Update Banner */}

      <div className="footer-update">

        <span>
          🚀 Tax Update Promise:
        </span>
        Government tax changes are verified and
        calculators are updated within
        <strong>
          3 days
        </strong>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © 2026 Accountra. All Rights Reserved.
        </p>
        <p>
          Built with ❤️ for smarter financial decisions.
        </p>

      </div>
    </footer>
  );
}
export default Footer;