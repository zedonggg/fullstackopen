import { useEffect, useState } from 'react'
import axios from 'axios'
import utils from './services/utils'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    utils.getAll().then(res => setPersons(res))
  }, [])

  const personsToShow = searchTerm
    ? persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.reduce((x, y) => x || y.name.toLowerCase() === newName.toLowerCase(), false)) {
      if (!window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        return
      }
      const newPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      newPerson.number = newNumber
      //console.log(newPerson)
      utils.updatePerson(newPerson).then(res => {
        console.log(res)
        setPersons(persons.map(person => person.id === res.id ? res : person))})
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1
    }

    utils.create(newPerson).then(res => setPersons(persons.concat(res)))
    setNewName('')
    setNewNumber('')
  }

  const deleteHandler = (id, name) => {
    if (window.confirm('Delete ' + name + ' ?')) {
      utils.deletePerson(id).then(res => {
      const newPersons = persons.filter((person) => person.id != id)
      setPersons(newPersons)
    })
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <div key={person.id}>{person.name} {person.number ? person.number : '(No Number)'} <button onClick={() => deleteHandler(person.id, person.name)}>delete</button></div>
      ))}
    </div>
  )
}

export default App
