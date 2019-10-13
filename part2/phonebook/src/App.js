import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Header = ({ title }) => <h2>{title}</h2>

const Filter = ({ handleFilterNameChange, filterName }) => {
  return (
    <div>
      filter shown with <input value={filterName} onChange={handleFilterNameChange} />
    </div>
  )
}

const PersonForm = ({ newName, handleNameChange, newPhone, handlePhoneChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      phone: <input value={newPhone} onChange={handlePhoneChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const People = ({ people, filterName }) => {
  const filterRows = (rows) => rows.filter(el => el.name.toLowerCase().includes(filterName))
  return (
    <ol>
      {filterRows(people).map(person => <li key={person.name} >{person.name} - {person.number}</li>)}
    </ol>
  )
}

const App = () => {
  const [people, setPeople] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/people')
      .then(response => {
        setPeople(response.data)
      })
  }, [])

  const handleFilterNameChange = (e) => {
    setFilterName(e.target.value)
  }

  const handleNewNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNewPhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (people.find(el => el.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      axios.post('http://localhost:3001/people',
      { name: newName,
        number: newPhone,
        id: people[people.length - 1].id + 1
      }).then(response => response.data)
        .then(newPerson => setPeople(people.concat(newPerson)))
    }
  }


  return (
    <div>
      <Header title='Phonebook' />
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      <Header title='add new' />
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNewNameChange}
        handlePhoneChange={handleNewPhoneChange}
        handleSubmit={handleSubmit}
      />
      <Header title='Numbers' />
      <People people={people} filterName={filterName} />
    </div>
  )
}

export default App