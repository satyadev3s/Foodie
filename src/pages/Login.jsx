import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../App.jsx";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    loginUser(formData);
    navigate("/menu");
  };

  return (
    <section className="page-section auth-section">
      <div className="auth-card">
        <span className="eyebrow">Welcome back</span>
        <h1>Login to Foodie</h1>
        <p>Continue ordering your favorite meals faster.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="btn btn-primary full-width" type="submit">
            Login
          </button>
        </form>

        <p className="auth-note">
          New to Foodie? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
