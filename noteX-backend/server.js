import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import admin from 'firebase-admin'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Firebase Admin setup
admin.initializeApp({
	credential: admin.credential.cert(
		JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
	),
})

app.get('/', (req, res) => {
	res.send('NoteX API is running...')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
