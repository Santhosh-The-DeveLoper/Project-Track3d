import { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await axios.post("https://material-recommendation-backend.vercel.app/forgot-password", { email });
            setMessage(res.data.message);  
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container-1">
            <h2 className="h49">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="inputx"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="btn345" type="submit">Send Reset Link</button>
            </form>

            <br />
            {message && <p style={{ color: "white" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default ForgotPassword;
