import anecdoteService from '../services/anecdotes'

export const createNote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes
    })
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const likedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: likedAnecdote
    })
  }
}


const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    case 'VOTE': {
      const likedAnecdote = action.data
      const newState = state.map(anecdote => anecdote.id !== likedAnecdote.id ?
        anecdote : likedAnecdote
      )
      return newState.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    }

  default:
    return state
  }
}

export default anecdoteReducer
