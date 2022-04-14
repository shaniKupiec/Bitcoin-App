export default {
  getUser,
}

var loggedInUser = {
  name: 'Shani Kupiec',
  coins: 100,
  moves: [],
}

function getUser() {
  return loggedInUser
}
