import React, { useState } from 'react'

const PersonForm = (props) => (
  <form onSubmit={props.addName}>
    <div>
      Name: <input
        value={props.newName}
        onChange={props.handleNameChange}
      />
    </div>
    <div>
      Number: <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
      />
    </div>

    <div>
      <button type="submit">Add entry</button>
    </div>
  </form>
)

export default PersonForm
