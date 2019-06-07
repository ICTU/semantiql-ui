import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { graphql } from 'react-apollo'

import './App.css'
import Table from './Table'
import Queries from './queries'


import { Route, Switch } from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
    overflow: 'scroll'
  },
});

const menuItemLink = (url, name, history) => {
  return (
    <ListItem button key={url} onClick={() => history.push(url)}>
      <ListItemIcon>
        <FindInPageIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  )
}

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;    

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <ListItem button onClick={() => window.open('http://www.semantiql.infra.ictu/graphiql', '_blank')}>
            <ListItemIcon>
            <OpenInNewIcon />
            </ListItemIcon>
            <ListItemText primary='GraphiQL' />
          </ListItem>
          <List>
            {
            Object.keys(Queries).map(k => menuItemLink('/' + k, Queries[k].name, this.props.history))
            }
          </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                SemantiQL UI 	&raquo; {
                  Object.keys(Queries).map(k => <Route key={k} path={'/' + k} render={() => Queries[k].name} />)
                }
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <Switch>
            {Object.keys(Queries).map(k => <Route key={k} path={'/'+k} render={ () => {
                console.log(Queries[k].gql)
                const MyTable = graphql(Queries[k].gql, {
                  options: {
                    errorPolicy: 'none'
                  }})(Table)
                return (<MyTable collectionName={k} />)
              }} />)
            }
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
