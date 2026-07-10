import "./Features.css";
import {
  FaCalculator,
  FaBolt,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCalculator />,
    title: "50+ Smart Calculators",
    desc: "GST, Income Tax, EMI, HRA, SIP, PPF and many more.",
  },
  {
    icon: <FaBolt />,
    title: "Instant Results",
    desc: "Fast and accurate calculations without any delay.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Reliable & Secure",
    desc: "No personal data is stored while using calculators.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive Design",
    desc: "Works perfectly on desktop, tablet, and mobile devices.",
  },
];

function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2>Why Choose Accountra?</h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;