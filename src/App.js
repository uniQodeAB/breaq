import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import HeaderContainer from './containers/HeaderContainer';
import Footer from './components/Footer';
import PrivateRoute from './containers/PrivateRoute';
import Login from './containers/Login';
import Home from './containers/Home';
import Dashboard from './containers/DashboardContainer';

import './App.css';

const App = () => {
  const NotFound = () => <div>Where are you going?</div>;

  return (
    <div className={'box'}>
      <HeaderContainer />
      <section className={'row content'}>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/login'} component={Login} />

          <PrivateRoute exact path={'/dashboard'} component={Dashboard} />

          <Route exact path={'/404'} component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </section>
      <Footer />
    </div>
  );
};

export default App;
