import { useHistory } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import MyButton from '../components/MyButton/MyButton';
import authSelectors from '../redux/selectors';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    marginTop: 25,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10,
  },
  pos: {
    marginBottom: 12,
    fontWeight: 500,
    color: '#041054',
  },
  dateinfo: {
    fontSize: 12,
    color: '#C2C2C2',
  },
});

const Transaction = () => {
  const history = useHistory();
  const handleGoBack = () => history.push('/');
  const handleGoExchangeHistory = () => history.push('/transactionhistory');
  const lastExchange = useSelector(authSelectors.getUserExchange);
  const currentUserID = useSelector(authSelectors.getUserId);

  const carrentUser = lastExchange.find(
    ({ userID }) => userID === currentUserID,
  );

  const classes = useStyles();

  return (
    <>
      <MyButton
        onClick={handleGoBack}
        className="button"
        value="Back to homepage"
      />

      <MyButton
        onClick={handleGoExchangeHistory}
        className="button"
        value="Go to transaction history"
      />

      <div className={classes.wrapper}>
        <Card className={classes.root} variant="outlined">
          {[carrentUser]?.map(item => (
            <CardContent key={item.currency}>
              <Typography variant="h5" component="h2" className={classes.title}>
                Transaction Details
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {` Sale: ${item.currency}`}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {`Buy: ${item.calculatorCurrency}`}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.dateinfo}
              >
                {item.date}
              </Typography>
            </CardContent>
          ))}
        </Card>
      </div>
    </>
  );
};

export default Transaction;
