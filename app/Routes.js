import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './components/Counter';
import Index from './components/index';
import Mine from './components/Mine';

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={Index}>

      </Route>
      <Route path='/mine' component={Mine} />
    </Switch>
  </App>
);
