import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './authActions';
import currencyActions from './currencyActions';
const initialState = {
  user: { name: null, email: null, password: null, id: null },
  isSignedIn: false,
};

const user = createReducer(initialState.user, {
  [authActions.registrationRequest]: (_, { payload }) => payload,
  [authActions.registrationSuccess]: (_, { payload }) => payload,
  [authActions.signInRequest]: (_, { payload }) => payload,
  [authActions.signInSuccess]: (_, { payload }) => payload,
  [authActions.signOutSuccess]: () => initialState.user,
});

const dataUser = createReducer([], {
  [authActions.registrationRequest]: (state, { payload }) => [
    payload,
    ...state,
  ],
});

const transaction = createReducer([], {
  [currencyActions.currencyExchangeSuccess]: (state, { payload }) => [
    payload,
    ...state,
  ],
});

const defaultCurrency = createReducer([], {
  [currencyActions.currencyDefault]: (_, { payload }) => payload,
});

const isSignedIn = createReducer(initialState.isSignedIn, {
  [authActions.registrationRequest]: () => false,
  [authActions.registrationSuccess]: () => true,
  [authActions.signInRequest]: () => false,
  [authActions.signInSuccess]: () => true,
  [authActions.signOutSuccess]: () => false,
});
export default combineReducers({
  transaction,
  defaultCurrency,
  user,
  dataUser,
  isSignedIn,
});
