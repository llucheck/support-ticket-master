import React, { Component, Fragment } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
  withStyles,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import TicketEditor from '../components/TicketEditor';
import ErrorSnackbar from '../components/ErrorSnackbar';

const styles = theme => ({
  tickets: {
    marginTop: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
});

const API = process.env.REACT_APP_API || 'http://localhost:3001';

class TicketManager extends Component {
  state = {
    loading: true,
    tickets: [],
    error: null,
  };

  componentDidMount() {
    this.getTickets();
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: `Bearer ${await this.props.authService.getAccessToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);

      this.setState({ error });
    }
  }

  async getTickets() {
    this.setState({ loading: false, tickets: (await this.fetch('get', '/tickets')) || [] });
  }

  saveTicket = async (ticket) => {
    if (ticket.id) {
      await this.fetch('put', `/tickets/${ticket.id}`, ticket);
    } else {
      await this.fetch('ticket', '/tickets', ticket);
    }

    this.props.history.goBack();
    this.getTickets();
  }

  async deleteTicket(ticket) {
    if (window.confirm(`Are you sure you want to delete "${ticket.title}"`)) {
      await this.fetch('delete', `/tickets/${ticket.id}`);
      this.getTickets();
    }
  }

  renderTicketEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const ticket = find(this.state.tickets, { id: Number(id) });

    if (!ticket && id !== 'new') return <Redirect to="/tickets" />;

    return <TicketEditor ticket={ticket} onSave={this.saveTicket} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h4">Ticket Manager</Typography>
        {this.state.tickets.length > 0 ? (
          <Paper elevation={1} className={classes.tickets}>
            <List>
              {orderBy(this.state.tickets, ['updatedAt', 'title'], ['desc', 'asc']).map(ticket => (
                <ListItem key={ticket.id} button component={Link} to={`/tickets/${ticket.id}`}>
                  <ListItemText
                    primary={ticket.title}
                    secondary={ticket.updatedAt && `Updated ${moment(ticket.updatedAt).fromNow()}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => this.deleteTicket(ticket)} color="inherit">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          !this.state.loading && <Typography variant="subtitle1">No tickets to display</Typography>
        )}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/tickets/new"
        >
          <AddIcon />
        </Fab>
        <Route exact path="/tickets/:id" render={this.renderTicketEditor} />
        {this.state.error && (
          <ErrorSnackbar
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  withOktaAuth,
  withRouter,
  withStyles(styles),
)(TicketManager);
