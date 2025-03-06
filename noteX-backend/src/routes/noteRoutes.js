import express from 'express' // ✅ Import express correctly
import {
	createNote,
	fetchAllNotes,
	fetchNoteById,
	editNote,
	removeNote,
} from '../controllers/noteController.js'

const router = express.Router()

router.post('/', createNote)
router.get('/', fetchAllNotes)
router.get('/:id', fetchNoteById)
router.put('/:id', editNote)
router.delete('/:id', removeNote)

export default router
