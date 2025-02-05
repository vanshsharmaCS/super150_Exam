import { useState } from "react";

const AudioRecorder = ({ onSave }) => {
    const [recording, setRecording] = useState(false);

    const startRecording = () => {
        setRecording(true);
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = (event) => {
            setRecording(false);
            onSave(event.results[0][0].transcript);
        };

        recognition.onerror = () => setRecording(false);
    };

    return <button onClick={startRecording} disabled={recording}>{recording ? "Recording..." : "Start Recording"}</button>;
};

export default AudioRecorder;
