import { db } from '../config/firebaseAdmin.js'

const notesCollection = db.collection('notes')

const addNote = async (note) => {
	const newNote = await notesCollection.add(note)
	return { id: newNote.id, ...note }
}

const getAllNotes = async () => {
	const snapshot = await notesCollection.get()
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

const getNoteById = async (id) => {
	const doc = await notesCollection.doc(id).get()
	return doc.exists ? { id: doc.id, ...doc.data() } : null
}

const updateNote = async (id, newData) => {
	await notesCollection.doc(id).update(newData)
	return { id, ...newData }
}

const deleteNote = async (id) => {
	await notesCollection.doc(id).delete()
	return { message: 'Note deleted' }
}

export { addNote, getAllNotes, getNoteById, updateNote, deleteNote }
