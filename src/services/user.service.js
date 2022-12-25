import storageService from "./storage.service";

export default {
  getLoggedInUser,
  signup,
  addMove,
};

const USER_KEY = "user";
const LOGGEDIN_USER_KEY = "loggedInUser";

storageService.saveToStorage(LOGGEDIN_USER_KEY, { name: "shani", coins: 100, moves: [] });

var gUsers = storageService.loadFromStorage(USER_KEY) || [];
var gLoggedInUser = storageService.loadFromStorage(LOGGEDIN_USER_KEY) || null;
loadUsers();

function loadUsers() {
  if (!gUsers || !gUsers.length) {
    const users = [
      {
        name: "Shani K",
        coins: 100,
        moves: [],
      },
    ];
    storageService.saveToStorage(USER_KEY, users);
  }
}

function getLoggedInUser() {
  return gLoggedInUser;
}

function signup(userName) {
  var user = gUsers.find((user) => user.name === userName);
  if (!user) {
    user = {
      name: userName,
      coins: 100,
      moves: [],
    };
    gUsers.push(user);
    storageService.saveToStorage(USER_KEY, gUsers);
  }
  gLoggedInUser = user;
  storageService.saveToStorage(LOGGEDIN_USER_KEY, gLoggedInUser);
}

function addMove(contact, amount) {
  const move = {
    toId: contact._id,
    to: contact.name,
    at: Date.now(),
    amount,
  };
  gLoggedInUser.coins -= amount;
  gLoggedInUser.moves.push(move);

  const idx = gUsers.findIndex((u) => u.name === gLoggedInUser.name);
  gUsers[idx] = gLoggedInUser;

  storageService.saveToStorage(USER_KEY, gUsers);
  storageService.saveToStorage(LOGGEDIN_USER_KEY, gLoggedInUser);
}
