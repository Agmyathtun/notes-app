import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNotes } from "../context/NotesContext";

function Home() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { notes, deleteNote } = useNotes();
  const isDark = theme === "dark";

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>My Notes</h1>
        {user && (
          <Link
            to="/add"
            style={{
              padding: "10px 18px",
              background: "#238636",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "15px",
            }}
          >
            + Add Note
          </Link>
        )}
      </div>

      {!user && (
        <p style={{ color: isDark ? "#aaa" : "#666" }}>
          Please{" "}
          <Link to="/login" style={{ color: "#58a6ff" }}>
            login
          </Link>{" "}
          to manage your notes.
        </p>
      )}

      {user && notes.length === 0 && (
        <p style={{ color: isDark ? "#888" : "#666" }}>
          No notes yet. Click “+ Add Note” to create one.
        </p>
      )}

      <div style={{ display: "grid", gap: "15px" }}>
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              padding: "18px",
              background: isDark ? "#161b22" : "#fff",
              borderRadius: "10px",
              border: `1px solid ${isDark ? "#333" : "#ddd"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <Link
                to={`/note/${note.id}`}
                style={{
                  color: isDark ? "white" : "#333",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {note.title}
              </Link>

              <button
                onClick={() => deleteNote(note.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#e53e3e",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Delete
              </button>
            </div>

            <p
              style={{
                color: isDark ? "#aaa" : "#666",
                margin: "0 0 8px 0",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {note.content.length > 100
                ? note.content.slice(0, 100) + "..."
                : note.content}
            </p>

            <small style={{ color: isDark ? "#666" : "#999" }}>
              {note.createdAt}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
