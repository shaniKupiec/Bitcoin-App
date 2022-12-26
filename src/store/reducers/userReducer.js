const INITIAL_STATE = {
  loggedInUser: null
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      };

    case "UPDATE_USER":
      return {
        ...state,
        loggedInUser: action.updatedUser,
      };

    default:
      return state;
  }
}
