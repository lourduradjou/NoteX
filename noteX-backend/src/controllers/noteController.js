import {
	addNote,
	getAllNotes,
	getNoteById,
	updateNote,
	deleteNote,
} from '../models/noteModel.js'

export const createNote = async (req, res) => {
	try {
		const {
			title,
			content,
			tags,
			cycle,
			'deadline-time': deadlineTime,
			'deadline-date': deadlineDate,
		} = req.body

		if (!title || !content) {
			return res
				.status(400)
				.json({ message: 'Title and content are required' })
		}

		const newNote = {
			title,
			content,
			tags: tags || [],
			cycle: cycle || false,
			'deadline-time': deadlineTime || null,
			'deadline-date': deadlineDate || null,
		}

		const note = await addNote(newNote)
		res.status(201).json(note)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const fetchAllNotes = async (req, res) => {
	try {
		const notes = await getAllNotes()
		res.json(notes)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const fetchNoteById = async (req, res) => {
	try {
		const note = await getNoteById(req.params.id)
		if (!note) return res.status(404).json({ message: 'Note not found' })
		res.json(note)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const editNote = async (req, res) => {
	try {
		const note = await updateNote(req.params.id, req.body)
		res.json(note)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const removeNote = async (req, res) => {
	try {
		await deleteNote(req.params.id)
		res.json({ message: 'Note deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
