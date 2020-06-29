import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './Components/Person'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Notifications from './Components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ phonebookFilterString, setPhonebookFilterString ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      let updateNumber =
        window.confirm(`${newName} is already added to phonebook.
          Would you like to update the number to ${newNumber}?`)
      if (updateNumber) {
        let id = persons.find(person => person.name === newName).id
        console.log('attempting to update number')
        const personObject = {
          name: newName,
          number: newNumber
        }

        personService
          .update(id, personObject)

          .then(updatedPerson =>{
            console.log('update promise succesful')
            setPersons(persons.map(person => person.id !== id
              ? person : updatedPerson))
            setNotificationMessage (
              `${personObject.name}'s number was changed to ${personObject.number}.`
            )
          })

          .catch(error => {
            console.log('error caught')
            setErrorMessage(
              `That person was already removed from the server.`
            )
            personService.getAll()
              .then(directory =>
                setPersons(directory))
            console.log('persons:', persons)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

          })

          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

          return
        } else {
        console.log('update cancelled')
        return
        }
      }


    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`${returnedPerson.name} was added to the directory.`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

      })
    }


  const deletePerson = (event, id) => {
    let areYouSure = window
      .confirm(`Are you sure you want to remove ${persons.find(p => p.id === id).name}?`)

    if (areYouSure) {
      let delPersName = persons.find(p => p.id === id).name
      console.log(`Attempting to delete entry ${id}`)
      personService
        .removePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
        setNotificationMessage(`${delPersName} deleted from the directory.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    } else console.log('He chickened out, sir!')
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

      <Notifications.Notification message={notificationMessage} />
      <Notifications.Error message={errorMessage} />

      <Filter phonebookFilterString={phonebookFilterString} handleFilterChange={handleFilterChange} />

      <h2>Add new entries</h2>

      <PersonForm addName={addName} handleNameChange={handleNameChange} newName={newName} newNumber ={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Entries</h2>

      <Persons persons={persons} phonebookFilterString={phonebookFilterString} deletePerson={deletePerson}/>

    </div>
  )
}

export default App
