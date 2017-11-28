import React, { Component } from 'react';
import './App.css';
import RegisterPage from './components/signup/RegisterPage';

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
            <div className={'box'}>
                <Header loggedIn={this.props.user.loggedIn} login={this.login} logout={this.logout} />

                <section className={'row content'}>
                    {this.props.user.loggedIn ?
                        <RegisterPage/>
                        :
                        <p>Hello</p>

                    }

                </section>
                <Footer loggedIn={this.props.user.loggedIn} photoURL={this.props.user.user.photoURL}/>
            </div>

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
                {props.loggedIn ?
                    <img src={props.photoURL} alt={''}/>
                    :
                    <p>&nbsp;</p>
                }
            </div>
        </footer>
    );
};

export default App;
