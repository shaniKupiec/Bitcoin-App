import userService from "../../services/user.service"

export function loadLoggedInUser() {
  return async (dispatch) => {
    try {
      const loggedInUser = userService.getLoggedInUser()
      dispatch({ type: 'SET_USER', loggedInUser })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function signUp() {
  return async (dispatch) => {
    try {
      const loggedInUser = userService.signUp()
      dispatch({ type: 'SET_USER', loggedInUser })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function spendBalance(contact, amount) {
  return async (dispatch) => {
    const updatedUser = userService.addMove(contact, amount)
    dispatch({ type: 'UPDATE_USER', updatedUser })
  }
}
