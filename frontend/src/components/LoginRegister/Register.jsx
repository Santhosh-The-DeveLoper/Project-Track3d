import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginRegister.css";

function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://material-recommendation-backend.vercel.app/register", form);
            alert(response.data.message);
        } catch (error) {
            alert("Registration failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="wrapper">
                <h2>Register</h2>
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
                    <button type="submit">Register</button>
                </form>
                <div className="register">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;

