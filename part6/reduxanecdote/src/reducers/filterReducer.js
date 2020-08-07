export const filter = (filterText) => {
  return {
    type: 'SET_FILTER',
    data: filterText
  }
}

const filterReducer = (state = '', action) => {
  if (action.type === 'SET_FILTER') {
    return action.data
  } else {
    return state
  }
}

export default filterReducer
