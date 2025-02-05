import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import Auth from "./Auth";
import Notes from "./Notes";

export const AuthContext = createContext();

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setUser(jwtDecode(token));
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setUser(jwtDecode(token));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <Router>
                <Routes>
                    <Route path="/" element={!user ? <Auth /> : <Navigate to="/notes" />} />
                    <Route path="/notes" element={user ? <Notes /> : <Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
