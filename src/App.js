import React, { Component } from 'react';
import './App.css';
import RegisterPageContainer from './containers/registerPageContainer';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import Header from './containers/Header';
import Footer from './containers/Footer';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className={'box'}>
                    <Header />
                    <section className={'row content'}>

                        <Route exact path="/" render={() => (
                            this.props.user.loggedIn ? (
                                <Redirect to={'/dashboard'}/>
                            ) : (
                                <RegisterPageContainer />
                            )
                        )}/>

                        <Route exact path={'/dashboard'} component={RegisterPageContainer}/>

                    </section>
                    <Footer loggedIn={this.props.user.loggedIn} photoURL={this.props.user.user.photoURL}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
