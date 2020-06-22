import React, { useState } from 'react'
import Persons from './Components/Person'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ phonebookFilterString, setPhonebookFilterString ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setPhonebookFilterString(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter phonebookFilterString={phonebookFilterString} handleFilterChange={handleFilterChange} />

      <h2>Add new entries</h2>

      <PersonForm addName={addName} handleNameChange={handleNameChange} newName={newName} newNumber ={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Entries</h2>

      <Persons persons={persons} phonebookFilterString={phonebookFilterString} />

    </div>
  )
}

export default App
