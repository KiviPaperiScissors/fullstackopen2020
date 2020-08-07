import React from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import NewNote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'



const App = () => {


  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <h2>Create new anecdote:</h2>
      <NewNote />
    </div>
  )

}

export default App
