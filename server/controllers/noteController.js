import Note from "../models/noteModel.js";

// get note controller

export const getNoteController = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = req.query.page || 1;
    const skipValue = (page - 1) * 30;

    // get total count of notes
    const totalNotes = await Note.countDocuments({ userId });

    if (totalNotes === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    // get latest 30 notes of user
    const notes = await Note.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(30);

    res
      .status(200)
      .json({ notes, totalNotes, message: "Notes fetched successfully" });
  } catch (err) {
    console.error("Error getting notes: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// create note controller
export const createNoteController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content } = req.body;

    const newNote = new Note({
      userId,
      title,
      content,
    });

    const note = await newNote.save();

    // Convert to an object and remove userId before sending response
    const noteObject = note.toObject();
    delete noteObject.userId;

    res
      .status(201)
      .json({ note: noteObject, message: "Note created successfully" });
  } catch (error) {
    console.error("Error creating note: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update note controller
export const updateNoteController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { noteId, title, content } = req.body;

    // find note
    const note = await Note.findById(noteId).select("+userId");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // check if the note belongs to the user
    if (note.userId.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized to update this note" });
    }

    // update note properties
    note.title = title;
    note.content = content;

    // save updated note
    await note.save();

    // Convert to an object and remove userId before sending response
    const noteObject = note.toObject();
    delete noteObject.userId;

    res
      .status(200)
      .json({ note: noteObject, message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete note controller
export const deleteNoteController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    // find note
    const note = await Note.findById(id).select("+userId");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // check if the note belongs to the user
    if (note.userId.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized to delete this note" });
    }

    // delete note
    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
