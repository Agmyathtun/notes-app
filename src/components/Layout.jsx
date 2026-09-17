import { Outlet, Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const isDark = theme === "dark";

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#58a6ff" : isDark ? "white" : "#333",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "600" : "400",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: isDark ? "#0d1117" : "#f5f5f5",
        color: isDark ? "white" : "#333",
      }}
    >
      <nav
        style={{
          background: isDark ? "#161b22" : "#fff",
          padding: "16px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${isDark ? "#333" : "#ddd"}`,
        }}
      >
        <div style={{ display: "flex", gap: "25px" }}>
          <Link to="/" style={linkStyle("/")}>
            Home
          </Link>
          {user && (
            <Link to="/add" style={linkStyle("/add")}>
              Add Note
            </Link>
          )}
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {user ? (
            <button
              onClick={logout}
              style={{
                padding: "7px 14px",
                background: "#e53e3e",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout {user.name}
            </button>
          ) : (
            <Link to="/login" style={linkStyle("/login")}>
              Login
            </Link>
          )}

          <button
            onClick={toggleTheme}
            style={{
              padding: "7px 14px",
              background: isDark ? "#238636" : "#333",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
      </nav>
      <main style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
