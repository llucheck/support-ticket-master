import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, LoginCallback } from '@okta/okta-react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Yatzhee from './pages/Yatzhee';
import RegEx from './pages/RegEx';
import TicketManager from './pages/TicketManager';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Route exact path="/" component={Home} />
      <Route exact path="/Yatzhee" component={Yatzhee} />
      <Route exact path="/RegEx" component={RegEx} />
      <Route exact path="/tickets" component={TicketManager} />
      <Route path="/login/callback" component={LoginCallback} />
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
