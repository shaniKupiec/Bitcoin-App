const INITIAL_STATE = {
  // loggedInUser: {
  //   name: "Shani K",
  //   coins: 100,
  //   moves: [],
  // },
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
