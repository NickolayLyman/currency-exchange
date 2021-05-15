import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import shortid from 'shortid';

import fetchExchangeRates from '../api';
import st from './ExchangeCcy.module.css';
import MyButton from '../components/MyButton/MyButton';

const Exchange = () => {
  const parseLocalStorage = JSON.parse(
    window.localStorage.getItem('transaction'),
  );
  const history = useHistory();
  const exchangeId = history.location.state;
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState(0);
  const [transaction, setTransaction] = useState(() => {
    return parseLocalStorage || [];
  });

  const filteredId = data.filter(item => item.ccy === exchangeId);
  const calculatorCurrency = currency * filteredId[0]?.buy;
  const calculatorBaseCurrency = baseCurrency / filteredId[0]?.sale;

  const toDetails = () => history.push('/transaction');

  const handleExchangeCurrency = () => {
    const newTr = {
      id: shortid.generate(),
      date: new Date().toLocaleString(),
      currency: `${currency} ${filteredId[0].ccy}`,
      calculatorCurrency: `${calculatorCurrency.toFixed(2)} ${
        filteredId[0].base_ccy
      }`,
    };
    setTransaction(prevTr => [newTr, ...prevTr]);
  };

  const handleExchangeBaseCurrency = () => {
    const newTr = {
      id: shortid.generate(),
      date: new Date().toLocaleString(),
      currency: `${baseCurrency} ${filteredId[0].base_ccy}`,
      calculatorCurrency: `${calculatorBaseCurrency.toFixed(2)} ${
        filteredId[0].ccy
      }`,
    };
    setTransaction(prevTr => [newTr, ...prevTr]);
  };

  useEffect(() => {
    window.localStorage.setItem('transaction', JSON.stringify(transaction));
  }, [transaction]);

  useEffect(() => {
    !exchangeId && history.push('/');
    const course = () =>
      fetchExchangeRates().then(response => {
        setData(response);
      });
    course();
  }, [history, exchangeId]);

  const handleCurrency = e => {
    e.preventDefault();
    const { value } = e.target;
    setCurrency(value);
  };

  const handleBaseCurrency = e => {
    e.preventDefault();
    const { value } = e.target;
    setBaseCurrency(value);
  };

  const handleGoBack = () => history.push('/');
  const handleGoExchangeHistory = () => history.push('/transactionhistory');
  const handleSubmit = e => {
    e.preventDefault();
  };
  const disableTransition = transaction?.length > 0 ? false : true;
  const disableExchangeCurrency = currency === 0 ? true : false;
  const disableExchangeBaseCurrency = baseCurrency === 0 ? true : false;

  return (
    <>
      <MyButton
        onClick={handleGoBack}
        className="button"
        value="Back to homepage"
      />

      <MyButton
        onClick={handleGoExchangeHistory}
        disabled={disableTransition}
        className="button"
        value="Transaction history"
      />

      <MyButton
        onClick={toDetails}
        disabled={disableTransition}
        className="button"
        value="Last transaction"
      />

      <Formik>
        <Form className={st.form} onSubmit={handleSubmit} autoComplete="off">
          {filteredId?.map(({ ccy, base_ccy }) => (
            <div key={ccy} className={st.wrapper}>
              <div className={st.inputWrapper}>
                <Field
                  onChange={handleCurrency}
                  className={st.ccy}
                  component={TextField}
                  type="number"
                  name="currency"
                  label={`${ccy} to ${base_ccy}`}
                  variant="outlined"
                  margin="dense"
                  value={currency}
                />
                <h3 className={st.value}>
                  <span className={st.span}>=</span>
                  {calculatorCurrency.toFixed(2)}
                  <span className={st.item}>{base_ccy}</span>
                </h3>
                <button
                  onClick={handleExchangeCurrency}
                  type="button "
                  disabled={disableExchangeCurrency}
                  className={st.exchangebtn}
                >
                  Exchange
                </button>
              </div>
              <div className={st.inputWrapper}>
                <Field
                  className={st.ccy}
                  onChange={handleBaseCurrency}
                  component={TextField}
                  type="number"
                  name="baseCurrency"
                  label={`${base_ccy} to ${ccy}`}
                  variant="outlined"
                  margin="dense"
                  value={baseCurrency}
                />
                <h3 className={st.value}>
                  <span className={st.span}>=</span>
                  {calculatorBaseCurrency.toFixed(2)}
                  <span className={st.item}>{ccy}</span>
                </h3>
                <button
                  onClick={handleExchangeBaseCurrency}
                  disabled={disableExchangeBaseCurrency}
                  className={st.exchangebtn}
                >
                  Exchange
                </button>
              </div>
            </div>
          ))}
        </Form>
      </Formik>
    </>
  );
};

export default Exchange;
