const initialState = null

let lastNotificationTimeout = null;

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification
    })
    
    clearTimeout(lastNotificationTimeout)
    lastNotificationTimeout = setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: null
      })
    }, time * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      break;
  }

  return state
}

export default notificationReducer