import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./App";
import AudioRecorder from "./AudioRecorder";
import './note.css'; // import the CSS file

const Notes = () => {
    const { user, logout } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/notes", { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setNotes(res.data))
            .catch(() => logout());
    }, []);

    const addNote = async (content) => {
        if (!content.trim()) return; // Prevent adding empty notes
        const res = await axios.post("http://localhost:5000/api/notes", { content }, { headers: { Authorization: localStorage.getItem("token") } });
        setNotes([...notes, res.data]);
        setText(""); // clear input field after adding note
    };

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:5000/api/notes/${id}`, { headers: { Authorization: localStorage.getItem("token") } });
        setNotes(notes.filter((n) => n._id !== id)); // Remove the deleted note from state
    };

    return (
        <div className="notes-container">
            <header className="notes-header">
                <h2>Welcome, {user.name}!</h2>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </header>
            <div className="note-input-container">
                <input
                    type="text"
                    className="note-input"
                    placeholder="Write a note"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="add-note-btn" onClick={() => addNote(text)}>Add Note</button>
            </div>
            <AudioRecorder onSave={addNote} />
            <div className="notes-list">
                {notes.map((note) => (
                    <div key={note._id} className="note-card">
                        <p className="note-content">{note.content}</p>
                        <button className="delete-note-btn" onClick={() => deleteNote(note._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
