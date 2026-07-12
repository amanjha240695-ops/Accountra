import "./About.css";

function About() {

  return (

    <div className="about-container">


      {/* Hero */}

      <section className="about-hero">

        <span className="hero-tag">
          Smart Finance Platform
        </span>

        <h1>
          Simplify Your Financial Calculations With Accountra
        </h1>

        <p>
          A modern financial calculator platform designed
          for taxation, accounting, loans, investments and
          business planning.
        </p>


      </section>





      {/* Trust Stats */}

      <section className="stats-container">


        <div className="stat-card">

          <h2>
            10+
          </h2>

          <p>
            Financial Calculators
          </p>

        </div>




        <div className="stat-card">

          <h2>
            3 Days
          </h2>

          <p>
            Tax Update Commitment
          </p>

        </div>




        <div className="stat-card">

          <h2>
            100%
          </h2>

          <p>
            Formula Based Calculation
          </p>

        </div>



        <div className="stat-card">

          <h2>
            Easy
          </h2>

          <p>
            User Friendly Experience
          </p>

        </div>



      </section>







      {/* About */}

      <section className="about-section">


        <h2>
          What is Accountra?
        </h2>


        <p>
          Accountra is a financial technology platform that
          provides simple and reliable calculators for
          students, professionals and businesses.
          It helps users understand complex financial
          calculations in a simple way.
        </p>


      </section>









      {/* How Works */}

      <section className="about-section">


        <h2>
          How Accountra Works?
        </h2>



        <div className="steps">


          <div>
            <b>01</b>
            <p>
              Enter your financial details
            </p>
          </div>


          <div>
            <b>02</b>
            <p>
              Standard formulas calculate results
            </p>
          </div>


          <div>
            <b>03</b>
            <p>
              Get instant financial reports
            </p>
          </div>


          <div>
            <b>04</b>
            <p>
              Copy, Print or Share results
            </p>
          </div>



        </div>


      </section>









      {/* Update Promise */}

      <section className="update-box">


        <span>
          IMPORTANT UPDATE POLICY
        </span>


        <h2>
          Government Tax Updates? We Handle It.
        </h2>



        <p>

          <strong>
            If any changes are announced by the Government
            regarding GST, TDS, Income Tax or other tax rules,
            Accountra will update the related calculators
            within <big>3 DAYS</big> after verification of
            official notifications.

          </strong>

        </p>


      </section>









      {/* Calculator */}

      <section className="about-section">


        <h2>
          Our Financial Tools
        </h2>



        <div className="calculator-grid">


          <div className="tool-card">

            <h3>
              🧾 GST Calculator
            </h3>

            <p>
              Calculate GST addition, removal and tax
              breakdown including CGST, SGST and IGST.
            </p>

          </div>




          <div className="tool-card">

            <h3>
              📑 TDS Calculator
            </h3>

            <p>
              Estimate tax deducted at source for different
              payments.
            </p>

          </div>




          <div className="tool-card">

            <h3>
              💰 EMI Calculator
            </h3>

            <p>
              Plan your loan repayment with accurate EMI
              calculations.
            </p>

          </div>




          <div className="tool-card">

            <h3>
              📊 Business Calculators
            </h3>

            <p>
              Salary, Profit & Loss, Billing and Balance
              Sheet calculations.
            </p>

          </div>



        </div>


      </section>









      {/* Tax */}

      <section className="about-section">


        <h2>
          Income Tax Information
        </h2>


        <div className="tax-box">


          <h3>
            Old Tax Regime
          </h3>


          <p>
            Includes various deductions and exemptions like
            Section 80C, HRA and other benefits.
          </p>


        </div>




        <div className="tax-box">


          <h3>
            New Tax Regime
          </h3>


          <p>
            Provides a simplified structure with different
            tax slabs and fewer deductions.
          </p>


        </div>



      </section>








      {/* Users */}

      <section className="about-section">


        <h2>
          Built For Everyone
        </h2>


        <div className="calculator-grid">


          <div className="tool-card">
            🎓 Students
            <p>
              Learn and practice accounting calculations.
            </p>
          </div>


          <div className="tool-card">
            👨‍💼 Professionals
            <p>
              Quickly estimate financial values.
            </p>
          </div>


          <div className="tool-card">
            🏢 Businesses
            <p>
              Manage financial planning easily.
            </p>
          </div>


        </div>


      </section>








      {/* CTA */}

      <section className="cta">


        <h2>
          Ready To Simplify Your Finance?
        </h2>


        <p>
          Explore Accountra calculators and make
          financial decisions easier.
        </p>



      </section>









      {/* Disclaimer */}

      <section className="disclaimer-box">


        <h2>
          Disclaimer
        </h2>


        <p>
          Accountra provides estimated calculations for
          educational and planning purposes. Always verify
          with official sources before making financial
          decisions.
        </p>


      </section>



    </div>

  );

}


export default About;