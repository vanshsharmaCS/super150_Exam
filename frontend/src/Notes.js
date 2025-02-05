import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./App";
import AudioRecorder from "./AudioRecorder";

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
        const res = await axios.post("http://localhost:5000/api/notes", { content }, { headers: { Authorization: localStorage.getItem("token") } });
        setNotes([...notes, res.data]);
    };

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <button onClick={logout}>Logout</button>
            <input type="text" placeholder="Write a note" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => addNote(text)}>Add Note</button>
            <AudioRecorder onSave={addNote} />
            {notes.map((note) => (
                <div key={note._id}>
                    <p>{note.content}</p>
                    <button onClick={() => setNotes(notes.filter((n) => n._id !== note._id))}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Notes;
