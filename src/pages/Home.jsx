import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === "dark";

  return (
    <div>
      <h1 style={{ color: isDark ? "white" : "black" }}>My Notes</h1>
      <p
        style={{
          color: isDark ? "#aaa" : "#666",
          marginTop: "10px",
        }}
      >
        {user
          ? `Welcome back, ${user.name}!`
          : "Please login to manage your notes."}
      </p>
      {!user && (
        <Link
          to="/login"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "10px 20px",
            background: "#238636",
            color: "white",
            texDecoration: "none",
            borderRadius: "8px",
          }}
        >
          Go to Login
        </Link>
      )}
    </div>
  );
}
export default Home;
