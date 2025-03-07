import admin from 'firebase-admin'
import fs from 'fs'

// Read JSON manually (since dynamic JSON imports have issues)
const serviceAccount = JSON.parse(
	fs.readFileSync(new URL('../../firebase-key.json', import.meta.url))
)

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://noteapp-865e1.firebaseio.com',
})

const db = admin.firestore()

export { admin, db }
