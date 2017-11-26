import React, { Component } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import SignUpComponent from './components/SignUpComponent';
import RegisterComponent from './components/RegisterComponent';
import Header from './components/Header';
import _ from 'lodash';
import Footer from './components/Footer';

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

        /*const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    user: items[item].user
                });
            }
            this.setState({
                items: newState
            });
        }); */
    }

    render() {
        return (
            <div className={'box'}>
                <Header loggedIn={this.props.user.loggedIn} login={this.login} logout={this.logout} />

                <section className={'row content'}>
                    {_.isEmpty(this.props.user.user) ?
                        <SignUpComponent/>
                        :
                        this.state.userData ?
                            <MapComponent />
                            :
                            <RegisterComponent/>

                    }

                </section>
                <Footer loggedIn={this.props.user.loggedIn} photoURL={this.props.user.user.photoURL}/>
            </div>

        );
  }
}

export default App;
