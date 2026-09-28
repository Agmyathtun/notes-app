import { useContext, createContext, useState, useEffect } from "react";
const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, content) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
  };
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id != id));
  };
  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);

}
