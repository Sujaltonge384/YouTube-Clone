import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";


function Register() {

  const navigate = useNavigate();


  // Form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // ======================================================
  // HANDLE REGISTER
  // ======================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");


    try {

      setLoading(true);


      // Send registration request to Express
      await api.post("/auth/register", {
        username,
        email,
        password,
      });


      setSuccess(
        "Registration successful! Redirecting to login..."
      );


      // Give the user a moment to see the message
      setTimeout(() => {
        navigate("/login");
      }, 1000);


    } catch (error) {

      console.error("Registration error:", error);


      setError(
        error.response?.data?.message ||
        "Unable to register"
      );


    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join YouTube Clone
        </p>


        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}


        {success && (
          <p className="auth-success">
            {success}
          </p>
        )}


        <form onSubmit={handleSubmit}>

          {/* Username */}
          <label>
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter username"
            required
          />


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
            minLength={6}
          />


          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>


        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;