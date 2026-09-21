import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/notescontext";
import { useTheme } from "../context/ThemeContext";
function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addNote] = useNotes();
  const navigate = useNavigate();
  const [theme] = useTheme();
  const isDark = theme === 'Dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return alert('Please fill in both tiltle and content');
    }
    addNote(title.trim(), content.trim());
    navigate('/');
  }
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Add New Note</h1>
      <from onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: isDark ? "#161b22" : "#fff",
            fontSize: "16px",
          }}
        />
        <textarea
          placeholder="Write your notes here"
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
            color: isDark ? 'white' : '#333',
            fontSize: "16px",
            resize: 'vertical'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            background: '#238636',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize:'16px'
          }}
        >
          Save note
        </button>
      </from>
    </div>
  );
}

export default AddNote;