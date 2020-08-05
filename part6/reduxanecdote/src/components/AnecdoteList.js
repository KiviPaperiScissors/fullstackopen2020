import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)

  return(
    <>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() =>
          dispatch(voteFor(anecdote.id))
        }
      />
    )}
    </>
  )
}

export default Anecdotes
