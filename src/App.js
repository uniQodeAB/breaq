import React, { Component } from 'react';
import './App.css';
import RegisterPageContainer from './containers/RegisterPage';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './containers/Header';
import Footer from './containers/Footer';
import PrivateRoute from './containers/PrivateRoute';
import Login from './containers/Login';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';

class App extends Component {
  render() {
    return (
      <div className={'box'}>
        <Header />
        <section className={'row content'}>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/login'} component={Login} />

            <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
            <PrivateRoute
              exact
              path={'/register'}
              component={RegisterPageContainer}
            />

            <Route exact path={'/404'} component={NotFound} />
            <Redirect from="*" to="/404" />
          </Switch>
        </section>
        <Footer />
      </div>
    );
  }
}

const NotFound = () => <div>Where are you going?</div>;

export default App;
