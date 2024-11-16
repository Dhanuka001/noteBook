const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/Note');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notesApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes

// Fetch active (non-deleted) notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({ deleted: false });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new note
app.post('/notes', async (req, res) => {
  const newNote = new Note({
    color: req.body.color,
    content: req.body.content,
    isFavourite: req.body.isFavourite,
  });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Soft delete a note (mark as deleted)
app.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true } // Return the updated note
    );
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note marked as deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a note (content or favourite)
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { content, isFavourite } = req.body;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Update fields
    if (content !== undefined) note.content = content;
    if (isFavourite !== undefined) note.isFavourite = isFavourite;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
