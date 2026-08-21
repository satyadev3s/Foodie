import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../App.jsx";

function Register() {
  const navigate = useNavigate();
  const { registerUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isComplete =
      formData.name.trim() &&
      formData.email.trim() &&
      formData.mobile.trim() &&
      formData.password.trim();

    if (!isComplete) {
      setError("Please fill in all registration fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    registerUser(formData);
    navigate("/menu");
  };

  return (
    <section className="page-section auth-section">
      <div className="auth-card">
        <span className="eyebrow">Join Foodie</span>
        <h1>Create Account</h1>
        <p>Save your details locally and enjoy a smoother demo checkout.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
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
            Mobile Number
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="btn btn-primary full-width" type="submit">
            Register
          </button>
        </form>

        <p className="auth-note">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
