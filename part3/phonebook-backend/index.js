const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

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

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${people.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/people', (req, res) => {
  res.json(people)
})

app.get('/api/people/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = people.find(per => per.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/people/:id', (req, res) => {
  const id = Number(req.params.id)
  people = people.filter(per => per.id !== id)

  res.status(204).end()
})

app.post('/api/people', (req, res) => {
  const id = getRandomArbitrary(0, Number.MAX_SAFE_INTEGER);
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  } else if (people.find(per => per.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id
  }

  people = people.concat(person)

  res.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})