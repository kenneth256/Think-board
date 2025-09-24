import express from "express"
import { createNote, deleteNote, fetchNotes, getNote, updateNote } from "./controllers/noteController.js";

const notesRoutes = express.Router()

notesRoutes.get('/', fetchNotes)
notesRoutes.post('/', createNote)
notesRoutes.delete('/:id', deleteNote)
notesRoutes.put('/:id', updateNote)
notesRoutes.get('/:id', getNote)

export default notesRoutes;