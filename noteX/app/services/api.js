const BASE_URL = 'http://localhost:5000'

export const fetchNotes = async () => {
	const response = await fetch(`${BASE_URL}/notes`)
	return await response.json()
}

export const addNote = async (noteData) => {
	const response = await fetch(`${BASE_URL}/notes`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(noteData),
	})
	return await response.json()
}
