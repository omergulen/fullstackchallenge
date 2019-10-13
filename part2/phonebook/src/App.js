import React, { useState, useEffect } from 'react'
import peopleDB from './services/people'
import './App.css';

const Header = ({ title }) => <h2>{title}</h2>

const Filter = ({ handleFilterNameChange, filterName }) => {
  return (
    <div>
      filter shown with <input value={filterName} onChange={handleFilterNameChange} />
    </div>
  )
}

const Notification = ({ message, type }) => (
  message ? (
    <div className={type && type === 'error' ? 'error' : 'success'}>
      <p>{message}</p>
    </div>
  ) : ''
)

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

const People = ({ people, filterName, handleDelete }) => {
  const filterRows = (rows) => rows.filter(el => el.name.toLowerCase().includes(filterName))

  return (
    <ol>
      {filterRows(people).map(person =>
        <li
          key={person.name}>
          {person.name} - {person.number}
          <b style={{ color: 'red', marginLeft: 4 }} onClick={() => handleDelete(person)}>X</b>
        </li>)}
    </ol>
  )
}

const App = () => {
  const [people, setPeople] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [notification, setNotification] = useState({ message: 'Page is successfully loaded.', type: 'success' })

  useEffect(() => {
    peopleDB.getAll().then(data => setPeople(data))
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
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        const id = people.find(el => el.name === newName).id
        peopleDB.update(id, {
          name: newName,
          number: newPhone,
          id
        }).then(updatedPerson => {
          setPeople(people.map(person =>
            person.id === id ? updatedPerson : person
          ))
          setNotification({
            message: `Information of ${newName} has been updated.`,
            type: 'success'
          })
        })
      }
    } else {
      peopleDB.create(
        {
          name: newName,
          number: newPhone,
          id: people[people.length - 1].id + 1
        }).then(newPerson => {
          setPeople(people.concat(newPerson))
          setNotification({
            message: `Person ${newName} has been saved.`,
            type: 'success'
          })
        })
    }
  }

  const handleDelete = person => {
    const result = window.confirm(`Do you really want to delete ${person.name}?`);
    if (result) {
      peopleDB.deletePerson(person.id)
        .then(() => {
          setPeople(people.filter(p => p.id !== person.id))
          setNotification({
            message: `Information of ${person.name} has been deleted.`,
            type: 'success'
          })
        })
        .catch(e => {
          setNotification({
            message: `Information of ${person.name} has already been removed from the serer.`,
            type: 'error'
          })
          setPeople(people.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <Header title='Phonebook' />
      <Notification message={notification.message} type={notification.type} />
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
      <People people={people} filterName={filterName} handleDelete={handleDelete} />
    </div>
  )
}

export default App