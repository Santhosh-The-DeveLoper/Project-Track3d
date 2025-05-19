import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginRegister.css";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://material-recommendation-backend.vercel.app/register",
        form
      );
      alert(response.data.message);
      setOtpSent(true);
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration failed. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://material-recommendation-backend.vercel.app/verify-otp",
        { email: form.email, otp }
      );
      alert(response.data.message);
      setForm({ username: "", email: "", password: "" });
      setOtp("");
      setOtpSent(false);
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h2>Register</h2>
        {!otpSent ? (
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <label>Username</label>
            </div>
            <div className="input-field">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="input-field">
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                required
              />
              <label>Enter OTP</label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        <div className="register">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
