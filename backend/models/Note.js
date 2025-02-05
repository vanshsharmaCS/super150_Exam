const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["text", "audio"], default: "text" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NoteSchema);
