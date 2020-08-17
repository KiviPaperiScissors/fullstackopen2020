
export const voteNotification = (notification, timeInSeconds) => {
  return async dispatch => {
  
    var timeoutID = window.localStorage.getItem('timerID')
    dispatch({
      type:'SET_NOTIFICATION',
      data: notification

    })
    console.log(timeoutID)
    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch({
        type:'SET_NOTIFICATION',
        data: ''
      })
    }, timeInSeconds*1000)
    console.log(timeoutID)
    window.localStorage.setItem('timerID', timeoutID)
  }
}



const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data

    default:
      return state
  }
}



export default notificationReducer
