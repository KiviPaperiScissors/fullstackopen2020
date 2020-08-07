
export const voteNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification: `You voted for ${content}`
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: {
      notification: ''
    }
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    case 'CLEAR_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export default notificationReducer
