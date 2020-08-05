import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNote(content))

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
export default NewNote
