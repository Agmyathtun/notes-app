import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { useTheme } from "../context/ThemeContext";

function EditNote() {
  const { id } = useParams();
  const { notes, updateNote } = useNotes();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const note = notes.find((n) => n.id === Number(id));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return alert("Please fill in both fields");
    }
    updateNote(note.id, title.trim(), content.trim());
    navigate(`/note/${note.id}`);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Edit Note</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: isDark ? "#161b22" : "#fff",
            color: isDark ? "white" : "#333",
            fontSize: "16px",
          }}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: isDark ? "#161b22" : "#fff",
            color: isDark ? "white" : "#333",
            fontSize: "16px",
            resize: "vertical",
          }}
        />

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              background: "#238636",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Update Note
          </button>

          <Link
            to={`/note/${note.id}`}
            style={{
              padding: "12px 24px",
              background: "#333",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
