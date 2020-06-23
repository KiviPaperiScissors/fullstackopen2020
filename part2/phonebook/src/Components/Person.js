import React from 'react'

const Person = ({ person }) => (
  <li> {person.name} {person.number}</li>
)

const Persons = (props) => (
  <ul>
    {props.persons.filter(person =>
      person.name.toUpperCase().includes(props.phonebookFilterString.toUpperCase())).map(filteredPerson => (
        <Person key={filteredPerson.name} person={filteredPerson} />
    ))}
  </ul>
)

export default Persons
