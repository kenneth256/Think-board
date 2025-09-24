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
        const { title, note } = req.body;
        if (!title || !note) {
            return res.status(400).json({ error: "Title and note are required" });
        }

        const newNote = new Note({ title, note });
        await newNote.save();

        return res.status(201).json({
            message: "Note created successfully!",
            note: newNote,
        });
    } catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({ error: "Failed to create note" });
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