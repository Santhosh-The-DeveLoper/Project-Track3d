import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("resetToken"); 

        if (!token) {
            setMessage("Reset token not found. Please request a new one.");
            return;
        }

        try {
            const res = await axios.post("https://material-recommendation-backend.vercel.app/reset-password", { token, new_password: newPassword });
            setMessage(res.data.message);
            localStorage.removeItem("resetToken"); 
        } catch (err) {
            setMessage(err.response.data.message || "Something went wrong");
        }
    };

    return (
        <div class="password">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            <p>{message}<Link to="/login"><button type="submit" class="Login12">Login</button></Link></p>
        </div>
    );
}

export default ResetPassword;
