import userService from "../../services/user.service"

export function loadLoggedInUser() {
  return async (dispatch) => {
    try {
      const loggedInUser = await userService.getLoggedInUser()
      dispatch({ type: 'SET_USER', loggedInUser })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function spendBalance(contact, amount) {
  return async (dispatch) => {
    const updatedUser = await userService.addMove(contact, amount)
    dispatch({ type: 'UPDATE_USER', updatedUser })
  }
}
