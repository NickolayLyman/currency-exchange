import { createAction } from '@reduxjs/toolkit';

const currencyExchangeSuccess = createAction('currency/exchangeSuccess');
const currencyDefault = createAction('currency/default');
const currencyActions = {
  currencyExchangeSuccess,
  currencyDefault,
};

export default currencyActions;
