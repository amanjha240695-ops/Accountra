import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useRequireLogin = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const checkLogin = () => {
    if (!isLoggedIn) {
      alert("Please login to use Accountra calculators.");
      navigate("/login");
      return false;
    }

    return true;
  };

  return checkLogin;
};

export default useRequireLogin;