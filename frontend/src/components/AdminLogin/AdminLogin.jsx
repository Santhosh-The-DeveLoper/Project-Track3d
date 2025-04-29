import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://material-recommendation-backend.vercel.app/api/login', form);
      if (res.data.status === 'success') {
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              name="username"
              onChange={handleChange}
              required
              type="text"
              value={form.username}
            />
            <label>Username</label>
          </div>
          <div className="input-field">
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
              value={form.password}
            />
            <label>Password</label>
          </div> <br /><br />
          <button type="submit">Login</button>
          <p className="register">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
