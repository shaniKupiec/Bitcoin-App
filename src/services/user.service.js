import storageService from './storage.service'

export default {
  getLoggedInUser,
  signup,
  addMove,
}

const USER_KEY = 'user'
const LOGGEDIN_USER_KEY = 'loggedinUser'

var gUsers = storageService.loadFromStorage(USER_KEY)
var gLoggedinUser = storageService.loadFromStorage(LOGGEDIN_USER_KEY) || null
loadUsers()

function loadUsers() {
  if (!gUsers || !gUsers.length) {
    const users = [
      {
        name: 'Shani K',
        coins: 100,
        moves: [],
      },
    ]
    storageService.saveToStorage(USER_KEY, users)
  }
}

function getLoggedInUser() {
  return gLoggedinUser
}

function signup(userName) {
  var user = gUsers.find((user) => user.name === userName)
  if (!user) {
    user = {
      name: userName,
      coins: 100,
      moves: [],
    }
    gUsers.push(user)
    storageService.saveToStorage(USER_KEY, gUsers)
  }
  gLoggedinUser = user
  storageService.saveToStorage(LOGGEDIN_USER_KEY, gLoggedinUser)
}

function addMove(contact, amount) {}
