import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiRequest from "../../lib/apiCall";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const { updateUser } = useContext(AuthContext);

    // TODO ==> Update onSubmit listener with action (React-19)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const formData = new FormData(e.target);

        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")

        // console.log("Form data -->", username, email, password)

        try {
            const res = await apiRequest.post("/auth/login", {
                username,
                password
            })

            // console.log(res)

            // localStorage.setItem("user", JSON.stringify(res.data))
            updateUser(res.data)

            navigate("/");

        } catch (err) {
            console.error("Error in login user: ", err);
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
                    <input name="password" type="password" required minLength={8} placeholder="Password" />
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <Link to="/register">{"Don't"} you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
}

export default Login;