import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { voteNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes.
        <button onClick={handleClick}>Vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  )


  return(
    <>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => {
          dispatch(voteFor(anecdote.id))
          dispatch(voteNotification(anecdote.content))
          setTimeout(() => {
            dispatch(clearNotification())
          }, 5000)
        }
        }
      />
    )}
    </>
  )
}

export default Anecdotes
