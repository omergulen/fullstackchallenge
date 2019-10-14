const express = require('express')
const app = express()

let people = [
  {
    "name": "Arto Hellas",
    "number": "123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/people', (req, res) => {
  res.json(people)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${people.length} people</p><p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})