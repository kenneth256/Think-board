import { Note } from "../Cong/bd.js";

export async function fetchNotes(req, res) {
    try {
        const results = await Note.find();
        res.send(results)
    } catch (error) {
        console.log("error fetching notes")
    }
}

export async function getNote(req, res) {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(404).json({message: "Invalid id"})
        }
        const note = await Note.findById(id)
        
        return res.send(note)
    } catch (error) {
        console.log(error)
    }
}
export async function createNote(req, res) {
    try {
        console.log('=== CREATE NOTE DEBUG ===');
        console.log('Request body:', req.body);
        console.log('Database connection state:', mongoose.connection.readyState);
        console.log('Database name:', mongoose.connection.name);
        
        const { title, note } = req.body;
        if (!title || !note) {
            console.log('Validation failed: missing title or note');
            return res.status(400).json({ error: "Title and note are required" });
        }

        console.log('Creating note with title:', title);
        const newNote = new Note({ title, note });
        console.log('Note object created:', newNote);
        
        console.log('Attempting to save to database...');
        await newNote.save();
        console.log('Note saved successfully:', newNote._id);

        return res.status(201).json({
            message: "Note created successfully!",
            note: newNote,
        });
    } catch (error) {
        console.error("=== ERROR CREATING NOTE ===");
        console.error("Error message:", error.message);
        console.error("Error name:", error.name);
        console.error("Full error:", error);
        return res.status(500).json({ 
            error: "Failed to create note",
            details: error.message 
        });
    }
}

export async function deleteNote(req, res) {
    try {
        const { id } = req.params
        const deleted = await Note.findByIdAndDelete(id);
        if (!id) {
            return res.status(404).json("error deleting", id)
        }
        return res.status(200).json("deleted successfully!", deleted)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function updateNote(req, res) {
    try {
        const { id } = req.params
        const updateData = req.body
        const updated = await Note.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) {
            return res.status(404).json("error updating note")
        }
        return res.status(200).json({
            message: "note updated successfully!",
            note: updated
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}