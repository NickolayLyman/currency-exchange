import authActions from './authActions';
import currencyActions from './currencyActions';

const registration = user => dispatch => {
  dispatch(authActions.registrationRequest(user));
  dispatch(authActions.registrationSuccess());
};

const signIn = logUser => dispatch => {
  dispatch(authActions.signInRequest(logUser));
  dispatch(authActions.signInSuccess(logUser));
};

const signOut = () => dispatch => {
  dispatch(authActions.signOutRequest());
  dispatch(authActions.signOutSuccess());
};

const setDefaultCurrency = ccy => dispatch => {
  dispatch(currencyActions.currencyDefault(ccy));
};

const exangeCurrency = data => dispatch => {
  dispatch(currencyActions.currencyExchangeSuccess(data));
};

const operation = {
  registration,
  signOut,
  signIn,
  setDefaultCurrency,
  exangeCurrency,
};

export default operation;
