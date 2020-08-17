import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'

const NewNote = (props) => {


  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createNote(content)

  }

  return (
    <div>
      <form onSubmit={addNote}>
        <div><input name="anecdote" /></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )

}
export default connect(null, { createNote })(NewNote)
