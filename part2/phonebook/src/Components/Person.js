import React from 'react'

const Person = (props) => (
  <li>
    {props.person.name} {props.person.number}
    <button onClick={(e) => props.deletePerson(e, props.person.id)}>
      Delete </button>
  </li>
)

const Persons = (props) => (
  <ul>
    {props.persons.filter(person =>
      person.name.toUpperCase().includes(props.phonebookFilterString.toUpperCase())).map(filteredPerson => (
        <Person key={filteredPerson.id} person={filteredPerson}
        deletePerson = {props.deletePerson}/>
    ))}
  </ul>
)

export default Persons
