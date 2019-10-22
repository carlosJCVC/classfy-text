import express from 'express'
import bodyParser from 'body-parser'
import classify from './classifyController'

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.post('/api/v1/train', classify.train)
app.post('/api/v1/analize', classify.ClassifyAreas)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))