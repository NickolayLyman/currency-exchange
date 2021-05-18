import { createAction } from '@reduxjs/toolkit';

const registrationRequest = createAction('auth/registerRequest');
const registrationSuccess = createAction('auth/registerSuccess');

const signInRequest = createAction('auth/signInRequest');
const signInSuccess = createAction('auth/signInSuccess');

const signOutRequest = createAction('auth/signOutRequest');
const signOutSuccess = createAction('auth/signOutSuccess');

const authActions = {
  registrationRequest,
  registrationSuccess,
  signInRequest,
  signInSuccess,
  signOutRequest,
  signOutSuccess,
};

export default authActions;
