import { useHistory } from 'react-router-dom';
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MyButton from '../components/MyButton/MyButton';
import authSelectors from '../redux/selectors';
import { useSelector } from 'react-redux';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3F51B5',
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 18,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop: 20,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
  },
  tabletitle: {
    backgroundColor: '#3F51B5',
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const lastExchange = useSelector(authSelectors.getUserExchange);
  const currentUserID = useSelector(authSelectors.getUserId);
  const carrentUser = lastExchange.filter(
    ({ userID }) => userID === currentUserID,
  );
  const history = useHistory();
  const handleGoBack = () => history.push('/');

  return (
    <>
      <h1 className={classes.title}>Transaction History</h1>
      <MyButton
        onClick={handleGoBack}
        className="button"
        value="Back to homepage"
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead className={classes.tabletitle}>
            <TableRow>
              <StyledTableCell align="center">Transaction date</StyledTableCell>
              <StyledTableCell align="center">Sale</StyledTableCell>
              <StyledTableCell align="center">Buy</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carrentUser.map(row => (
              <StyledTableRow key={row.date}>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.currency}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.calculatorCurrency}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
