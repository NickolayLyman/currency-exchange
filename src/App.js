import { Switch } from 'react-router-dom';
import Exchange from './views/Exchange';
import Header from './components/Header/Header';
import Home from './views/Home';
import ExchangeCCy from './views/ExchangeCcy';
import TransactionHistory from './views/TransactionHistory';
import Transaction from './views/Transaction';
import RegistrationPage from './views/RegistrationPage';
import LoginPage from './views/LoginPage';
import PrivateRoute from './components/Route/PrivateRoute';
import PablicRoute from './components/Route/PublicRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <PablicRoute exact path="/">
          <Home />
        </PablicRoute>
        <PrivateRoute exact path="/exchange">
          <Exchange />
        </PrivateRoute>
        <PrivateRoute exact path="/exchange/:ccy">
          <ExchangeCCy />
        </PrivateRoute>
        <PrivateRoute path="/transaction">
          <Transaction />
        </PrivateRoute>
        <PrivateRoute path="/transactionhistory">
          <TransactionHistory />
        </PrivateRoute>
        <PablicRoute exact path="/register" restricted>
          <RegistrationPage />
        </PablicRoute>
        <PablicRoute exact path="/login" restricted>
          <LoginPage />
        </PablicRoute>
      </Switch>
    </div>
  );
}

export default App;
