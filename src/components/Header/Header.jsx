import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navigation from '../Navigation/Navigation';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between ',
    width: '1400px ',
    alignItems: 'center',
    paddingLeft: 80,
    paddingRight: 80,
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" className={classes.wrapper}>
            <Navigation />
            <AuthNavigation />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
