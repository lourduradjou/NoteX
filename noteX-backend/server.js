import express from 'express'
import cors from 'cors'
import noteRoutes from './src/routes/noteRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/notes', noteRoutes)

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
