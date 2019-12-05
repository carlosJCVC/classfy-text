import express from 'express'
import bodyParser from 'body-parser'
import classify from './src/classifyController'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors({
	origin: 'http://localhost:8000'
}))

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: false,
    })
)

app.post('/api/v1/train', classify.train)
app.post('/api/v1/analize', classify.ClassifyAreas)
app.get('/api/v1/test', classify.ClassifyAreasTest)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))