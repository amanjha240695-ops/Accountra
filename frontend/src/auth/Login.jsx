import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const validateForm = () => {
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email) {
      alert("Please enter your email.");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      alert("Please enter your password.");
      return false;
    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });


      const { token, user, message } = response.data;


      // Role checking
      if (
        formData.role === "admin" &&
        user.role !== "admin"
      ) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(
          "Access denied.\nThis account is not an administrator."
        );

        setLoading(false);
        return;
      }


      localStorage.setItem(
        "token",
        token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      alert(message);


      // Redirect based on role
      if (user.role === "admin") {

        navigate("/admin");

      } else {

        navigate("/");

      }


    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="login-page">

      <div className="login-card">


        <div className="login-header">

          <div className="logo">
            A
          </div>

          <h1>
            Welcome Back
          </h1>

          <p>
            Sign in to your Accountra account and
            continue managing your finances.
          </p>

        </div>



        <form onSubmit={handleSubmit}>


          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>



          <div className="input-group">

            <label>
              Password
            </label>


            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />


              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {
                  showPassword
                    ? <EyeOff size={18}/>
                    : <Eye size={18}/>
                }

              </button>

            </div>


          </div>




          <div className="role-section">

            <label>
              Login As
            </label>


            <div className="role-options">


              <label className="role-option">

                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={
                    formData.role === "user"
                  }
                  onChange={handleChange}
                />

                <span>
                  User
                </span>

              </label>




              <label className="role-option">


                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={
                    formData.role === "admin"
                  }
                  onChange={handleChange}
                />


                <span>
                  Admin
                </span>


              </label>


            </div>


          </div>





          <div className="login-options">


            <label className="remember">


              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />


              <span>
                Remember Me
              </span>


            </label>



            <Link
              to="/forgot-password"
              className="forgot-link"
            >
              Forgot Password?
            </Link>


          </div>





          <button
            type="submit"
            className={`login-btn ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >

            {
              loading
              ? "Signing In..."
              : "Sign In"
            }

          </button>



        </form>





        <div className="divider">

          <span>
            or
          </span>

        </div>





        <p className="register-link">


          Don't have an account?


          <Link to="/register">
            Create Account
          </Link>


        </p>




      </div>


    </div>
  );
}

export default Login;