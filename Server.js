const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Verbinde mit MongoDB
mongoose.connect('mongodb://localhost:27017/mein-projekt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Erstelle ein Schema und Modell für Kommentare
const commentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// Erstelle ein Schema und Modell für Benutzer
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Endpunkt zum Abrufen aller Kommentare
app.get('/comments', async (req, res) => {
    const comments = await Comment.find().sort({ date: -1 });
    res.json(comments);
});

// Endpunkt zum Hinzufügen eines neuen Kommentars
app.post('/comments', async (req, res) => {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.json(newComment);
});

// Endpunkt zum Hinzufügen eines neuen Benutzers
app.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
