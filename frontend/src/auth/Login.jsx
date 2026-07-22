import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      if (formData.role === "admin" && user.role !== "admin") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Access denied.\nThis account is not an administrator.");
        setLoading(false);
        return;
      }

      login(token, user);
      alert(message);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg-page">
      <div className="lg-card">
        <div className="lg-header">
          <div className="lg-logo">A</div>
          <h1>Welcome Back</h1>
          <p>
            Sign in to your Accountra account and continue managing your
            finances.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="lg-form">
          <div className="lg-field-group">
            <label className="lg-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="lg-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="lg-field-group">
            <label className="lg-label">Password</label>
            <div className="lg-password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="lg-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="lg-show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="lg-role-section">
            <label className="lg-label">Login As</label>
            <div className="lg-role-options">
              <label className="lg-role-option">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                <span>User</span>
              </label>

              <label className="lg-role-option">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          <div className="lg-options">
            <label className="lg-remember">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Remember Me</span>
            </label>

            <Link to="/forgot-password" className="lg-forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`lg-submit-btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="lg-divider">
          <span>or</span>
        </div>

        <p className="lg-register-link">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;