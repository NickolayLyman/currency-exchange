import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import fetchExchangeRates from '../api';
import MyButton from '../components/MyButton/MyButton';
import operation from '../redux/operation';
import { useSelector, useDispatch } from 'react-redux';
import authSelectors from '../redux/selectors';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    maxWidth: 300,
    margin: 15,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    fontWeight: 600,
    color: '#051678',
  },
});

export default function Exchange() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userID = useSelector(authSelectors.getUserId);

  useEffect(() => {
    const course = () =>
      fetchExchangeRates().then(response => {
        setData(response);
      });
    course();
  }, []);

  const history = useHistory();

  const goToExchange = ccy => {
    const normalalizedCcy = ccy.toLowerCase();
    history.push(`/exchange/${normalalizedCcy}`, ccy);
    const idCcy = {
      userID,
      ccy,
    };

    dispatch(operation.setDefaultCurrency(idCcy));
  };

  const handleGoBack = () => history.push('/');

  return (
    <>
      <MyButton
        onClick={handleGoBack}
        className="button"
        value="Back to homepage"
      />
      <ul className={classes.wrapper}>
        {data.map(({ ccy, base_ccy, buy, sale }) => (
          <li key={ccy}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {ccy} - {base_ccy}
                </Typography>
                <Typography variant="body2" component="p">
                  Buy: {Number(buy).toFixed(2)}
                  <br />
                  Sale: {Number(sale).toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => goToExchange(ccy)}
                  className={classes.button}
                >
                  Go to exchange
                </Button>
              </CardActions>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
