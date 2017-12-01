import React, { Component } from 'react';
import './App.css';
import RegisterPageContainer from './containers/registerPageContainer';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';

class App extends Component {

    constructor() {
        super();
        this.state = { }
    }

    login = () => {
        this.props.onLogin();
    };

    logout = () => {
        this.props.onLogout();
    }

    componentDidMount() {
        this.props.onAuthStateChanged();
    }

    render() {
        return (
            <BrowserRouter>
                <div className={'box'}>
                    <Header loggedIn={this.props.user.loggedIn} login={this.login} logout={this.logout} />
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

const Header = (props) => {
    return (
        <header className={'row header'}>
            <div className="wrapper">
                <h1>Fun Food Friends</h1>
                {props.loggedIn ?
                    <button onClick={props.logout}>Logout</button>
                    :
                    <button onClick={props.login}>Log In</button>
                }
            </div>
        </header>
    );
};


const Footer = (props) => {
    return (
        <footer className={'row footer'}>
            <div className='user-profile'>
                {props.loggedIn && <img src={props.photoURL} alt={''}/>}
            </div>
        </footer>
    );
};

export default App;
