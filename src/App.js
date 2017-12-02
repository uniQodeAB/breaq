import React, { Component } from 'react';
import './App.css';
import RegisterPageContainer from './containers/registerPageContainer';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import Header from './containers/Header';
import Footer from './containers/Footer';
import PrivateRoute from './containers/PrivateRoute';
import Login from './containers/Login';
import Home from './containers/Home';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className={'box'}>
                    <Header />
                    <section className={'row content'}>
                        <Switch>
                            <Route exact path={'/'} component={Home}/>
                            <PrivateRoute path={'/dashboard'} component={RegisterPageContainer}/>
                            <Route exact path={'/login'} component={Login}/>
                            <Route path={'/404'} component={NotFound}/>
                            <Redirect from='*' to='/404' />
                        </Switch>

                    </section>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}


const NotFound = () => (
    <div>Where are you going?</div>
);


export default App;
