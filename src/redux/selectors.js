const getIsSignIn = state => state.auth.isSignedIn;
const getUsername = state => state.auth.user.name;
const getUserId = state => state.auth.user.id;
const getUsers = state => state.auth.dataUser;
const getUserPassword = state => state.auth.user.password;

const getDefaultCurrency = state => state.auth.defaultCurrency;
const getUserExchange = state => state.auth.transaction;

const authSelectors = {
  getUserExchange,
  getUserPassword,
  getIsSignIn,
  getUsername,
  getUserId,
  getUsers,
  getDefaultCurrency,
};

export default authSelectors;
