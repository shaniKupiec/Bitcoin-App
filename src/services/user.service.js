import storageService from "./storage.service";

export default {
  getLoggedInUser,
  signUp,
  addMove,
};

const USER_KEY = "user";
const LOGGED_IN_USER_KEY = "loggedInUser";

// const gDefaultLoggedInUser = { name: "shani", coins: 100, moves: [] }

var gUsers = storageService.load(USER_KEY) || [];
var gLoggedInUser = _loadLoggedInUser()

function getLoggedInUser() {
  return gLoggedInUser;
}

function signUp(userName = 'Person') {
  var user = gUsers.find((user) => user.name === userName);
  if (!user) {
    user = {
      name: userName,
      coins: 100,
      moves: [],
    };
    gUsers.push(user);
    storageService.save(USER_KEY, gUsers);
  }
  gLoggedInUser = user;
  storageService.save(LOGGED_IN_USER_KEY, gLoggedInUser);
  return gLoggedInUser
}

function addMove(contact, amount) {
  const move = {
    toId: contact._id,
    to: contact.name,
    at: Date.now(),
    amount,
    type: 'BTC'
  };
  gLoggedInUser.coins -= amount;
  gLoggedInUser.moves.unshift(move);

  const idx = gUsers.findIndex((u) => u.name === gLoggedInUser.name);
  gUsers[idx] = gLoggedInUser;

  storageService.save(USER_KEY, gUsers);
  storageService.save(LOGGED_IN_USER_KEY, gLoggedInUser);

  return gLoggedInUser
}

// function _loadUsers() {
//   let contacts = storageService.load(STORAGE_KEY)
//   if (!contacts || !contacts.length) {
//     contacts = gDefaultContacts
//     storageService.save(STORAGE_KEY, gDefaultContacts)
//   }
//   return contacts
// }

function _loadLoggedInUser() {
  let loggedInUser = storageService.load(LOGGED_IN_USER_KEY) || 'no user'
  return loggedInUser
}
