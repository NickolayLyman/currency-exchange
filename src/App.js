import { Switch, Route } from 'react-router-dom';
import Exchange from './views/Exchange';
import Header from './components/Header/Header';
import Home from './views/Home';
import ExchangeCCy from './views/ExchangeCcy';
import TransactionHistory from './views/TransactionHistory';
import Transaction from './views/Transaction';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/exchange">
          <Exchange />
        </Route>
        <Route exact path="/exchange/:ccy">
          <ExchangeCCy />
        </Route>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/transactionhistory">
          <TransactionHistory />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
