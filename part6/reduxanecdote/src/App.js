import React from 'react'
import NewNote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'



const App = () => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>Create new anecdote:</h2>
      <NewNote />
    </div>
  )

}

export default App
