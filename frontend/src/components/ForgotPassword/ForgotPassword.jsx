import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showResetButton, setShowResetButton] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://material-recommendation-backend.vercel.app/forgot-password", { email });
            setMessage(res.data.message + ". Token: " + res.data.token);
            localStorage.setItem("resetToken", res.data.token);
            setShowResetButton(true);
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container-1">
            <h2 class="h49">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    class="inputx"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            <br/><br/>
            <p>{message}</p> <br/>
            {showResetButton && (
                <Link to="/reset-password">
                    <button>Reset Password</button>
                </Link>
            )}
        </div>
    );
}

export default ForgotPassword;
