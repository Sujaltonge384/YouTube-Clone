import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();


  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ======================================================
  // HANDLE LOGIN
  // ======================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");


    try {

      setLoading(true);


      // Send login request to Express
      const response = await api.post("/auth/login", {
        email,
        password,
      });


      const { token, user } = response.data;


      // Store authentication information
      login(user, token);


      // Return to Home after successful login
      navigate("/");


    } catch (error) {

      console.error("Login error:", error);


      setError(
        error.response?.data?.message ||
        "Unable to login"
      );


    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Sign In</h1>

        <p className="auth-subtitle">
          Sign in to your YouTube Clone account
        </p>


        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}


        <form onSubmit={handleSubmit}>

          {/* Email */}
          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter email"
            required
          />


          {/* Password */}
          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter password"
            required
          />


          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>


        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;