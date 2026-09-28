import { useParams, Link, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { useTheme } from "../context/ThemeContext";

function NoteDetail() {
  const { id } = useParams();
  const { notes, deleteNote } = useNotes();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === Number(id));

  if (!note) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Note not found</h2>
        <Link to="/" style={{ color: "#58a6ff" }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteNote(note.id);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <Link to="/" style={{ color: "#58a6ff", textDecoration: "none" }}>
        ← Back to Notes
      </Link>

      <h1 style={{ marginTop: "20px" }}>{note.title}</h1>

      <p
        style={{
          color: isDark ? "#888" : "#666",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        {note.createdAt}
      </p>

      <div
        style={{
          lineHeight: "1.7",
          fontSize: "16px",
          whiteSpace: "pre-wrap",
          marginBottom: "30px",
        }}
      >
        {note.content}
      </div>

      <button
        onClick={handleDelete}
        style={{
          padding: "10px 20px",
          background: "#e53e3e",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Delete Note
      </button>
    </div>
  );
}

export default NoteDetail;
