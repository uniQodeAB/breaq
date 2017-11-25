import React, { Component } from 'react';
import './App.css';
import firebase, {auth, provider} from './firebase.js';
import MapComponent from './components/MapComponent';
import SignUpComponent from './components/SignUpComponent';
import RegisterComponent from './components/RegisterComponent';


class App extends Component {

    constructor() {
        super();
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            user: null,
            userData: null
        }
    }

    login = () => {

        provider.setCustomParameters({
            prompt: 'select_account'
        });
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });

                const usersRef = firebase.database().ref('users');
                usersRef.orderByChild('uid').equalTo(this.state.user.uid).once('value', snapshot => {
                    const userData = snapshot.val();
                    if (userData) {
                        /* const newUser = {
                            user: this.state.user.displayName || this.state.user.email,
                            uid: this.state.user.uid
                        };
                        usersRef.push(newUser); */
                        this.setState({
                            userData
                        })
                    }
                });
            });
    }

    logout = () => {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });

        const itemsRef = firebase.database().ref('items');
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
        });
    }

    render() {
        return (
            <div className={'box'}>
                <header className={'row header'}>
                    <div className="wrapper">
                        <h1>Fun Food Friends</h1>
                        {this.state.user ?
                            <button onClick={this.logout}>Logout</button>
                            :
                            <button onClick={this.login}>Log In</button>
                        }
                    </div>
                </header>
                <section className={'row content'}>
                    {this.state.user ?
                        this.state.userData ?
                            <MapComponent />
                            :
                            <RegisterComponent/>
                        :
                        <SignUpComponent/>
                    }

                </section>
                <footer className={'row footer'}>
                    <p><b>footer</b> (fixed height)</p>
                        <div className='user-profile'>
                            {this.state.user ?
                                <img src={this.state.user.photoURL} alt={''}/>
                                :
                                <p>&nbsp;</p>
                            }
                        </div>
                </footer>
            </div>

        );
  }
}

export default App;
