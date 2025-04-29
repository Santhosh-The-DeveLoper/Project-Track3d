import { useState } from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = { email, password };
        
        try {
            const response = await fetch("https://material-recommendation-backend.vercel.app/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                navigate('/home');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Login failed");
        }
    };

    return (
        <div className ="container"> 
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-field">
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <label>Enter your email</label>
                </div>
                <div className="input-field">
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <label>Enter your password</label>
                </div>
                <div className="forget">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={remember} 
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <p>Remember me</p>
                    </label>
                    <Link to="/forgot-password">ForgotPassword</Link>
                </div>
                <button type="submit">Log In</button>
                <div className="register">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Login;
