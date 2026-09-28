import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter your name");
    login(name.trim());
    navigate(location.state?.from?.pathname || "/");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: isDark ? "#161b22" : "#fff",
            color: isDark ? "white" : "#333",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#238636",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
