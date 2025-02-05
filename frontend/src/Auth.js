import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./App";
import './auth.css'; // import the CSS file for styling

const Auth = () => {
    const { login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/${isLogin ? "login" : "register"}`;
        const data = isLogin ? { email, password } : { name, email, password };
        
        try {
            const res = await axios.post(url, data);
            if (res.data.token) {
                localStorage.setItem("token", res.data.token); // Store the token in localStorage
                login(res.data.token); // Trigger login context
            }
            if (!isLogin) setIsLogin(true); // If it's register, switch to login form
        } catch (error) {
            console.error(error);
            alert("Error, please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-heading">{isLogin ? "Login" : "Register"}</h2>
                <form onSubmit={handleSubmit} className="auth-form-fields">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Name"
                            className="auth-input"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="auth-input"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="auth-input"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-btn">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>
                <div className="switch-auth">
                    <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Switch to Register" : "Switch to Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
