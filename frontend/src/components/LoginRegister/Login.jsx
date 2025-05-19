import { useState } from "react";
import "./LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";

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
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            if (data.message === "Email not verified. Please verify your account.") {
                alert(data.message);
                return;
            }

            alert(data.message);
            navigate("/home");

        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <div className="container">
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
                        <Link to="/forgot-password">Forgot Password</Link>
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
