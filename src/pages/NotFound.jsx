import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function NotFound() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <h1 style={{ fontSize: "50px", color: isDark ? "white" : "black" }}>
        404
      </h1>
      <p style={{ color: isDark ? "#888" : "#666" }}>Page not Found</p>
      <Link to="/" style={{ color: "#58a6ff" }}>
        {" "}
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
