import React, { useState } from 'react'

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
      {filterRows(people).map(person => <li key={person.name} >{person.name} - {person.phone}</li>)}
    </ol>
  )
}

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' },
    { name: 'John Doe', phone: '123-4567890' }
  ])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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
      setPeople(people.concat({ name: newName, phone: newPhone }))
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