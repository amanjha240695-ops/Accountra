import "./CalculatorCard.css";
import { useNavigate } from "react-router-dom";

const CalculatorCard = (props) => {
  const navigate = useNavigate();

  return (
    <div className="calculator-card">
      <div className="calculator-icon">{props.icon}</div>

      <h3>{props.title}</h3>

      <p>{props.description}</p>

      <button onClick={() => navigate(props.path)}>
        Use Calculator
      </button>
    </div>
  );
};

export default CalculatorCard;