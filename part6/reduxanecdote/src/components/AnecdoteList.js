import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

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

const Anecdotes = (props) => {

  return(
    <>
    {props.anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => {
          props.voteFor(anecdote)
          props.voteNotification(`You voted for '${anecdote.content}'.`, 5)
          }
        }
      />
    )}
    </>
  )
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  voteFor,
  voteNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes
