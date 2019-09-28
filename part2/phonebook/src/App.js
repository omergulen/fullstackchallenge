import React, { useState } from 'react'

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' },
    { name: 'John Doe', phone: '123-4567890' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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

  const renderRows = () => people.map(person => <li key={person.name} >{person.name} - {person.phone}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleNewPhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ol>
        {renderRows()}
      </ol>
    </div>
  )
}

export default App