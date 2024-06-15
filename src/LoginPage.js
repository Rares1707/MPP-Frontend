import './App.css';
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from 'react-router-dom';

export function LoginPage() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loggedInSuccessfully, setLoggedInSuccessfully] = useState(false);

    const handleLogin = async (event) =>
    {
        event.preventDefault();
        try
        {
            const response = await axios.post(sessionStorage.getItem('hostAddress') + "/login", {
                username,
                password,
            });
            sessionStorage.setItem("access_token", response.data.access_token);
            //console.log(localStorage.getItem("access_token"));
            alert("Login successful");
            setLoggedInSuccessfully(true);
        }
        catch (error)
        {
            console.error(error);
            alert("Login failed" + error);
        }
    };

    const handleRegister = async (event) =>
    {
        event.preventDefault();
        try
        {
            const response = await axios.post(
                sessionStorage.getItem('hostAddress') +"/register", {
                username,
                password,
            });
            alert("Register successful, now you need to log in");
        }
        catch (error)
        {
            alert("Login failed" + error);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    if (loggedInSuccessfully) {
        return <Navigate to="/home" />;
    }

    return (
        <div>
            <form method="post">
                <input
                    type="text"
                    id=""
                    placeholder="Username"
                    name="username"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                />
                <br />
                <input
                    type="password"
                    required
                    placeholder="Your Password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br />
            </form>
            <button type="submit" onClick={handleLogin}>
                Log In
            </button>
            <button type="submit" onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}