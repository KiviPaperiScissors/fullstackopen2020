import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './Components/Person'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ phonebookFilterString, setPhonebookFilterString ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
