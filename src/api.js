import axios from 'axios';

const BASE_URL = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;

axios.defaults.baseURL = BASE_URL;

const fetchExchangeRates = async () => {
  try {
    const { data } = await axios.get();
    return data;
  } catch (error) {
    return error.message;
  }
};

export default fetchExchangeRates;
