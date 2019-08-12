import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './components/Counter';
import Index from './components/index';
import RegisterView from './components/RegisterView';
import NavigationView from './components/NavigationView';
export default () => (
  <App>
    <Switch>
      <Route path='/counter' component={CounterPage} />
      <Route path={routes.HOME} component={Index}>

      </Route>
    </Switch>
  </App>
);
