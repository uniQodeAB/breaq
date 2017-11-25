import React, { Component } from 'react';
import './App.css';
import firebase, {auth, provider} from './firebase.js';
import MapComponent from './components/MapComponent';

class App extends Component {

    constructor() {
        super();
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            user: null
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

    handleSubmit = (e) => {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
            title: this.state.currentItem,
            user: this.state.user.displayName || this.state.user.email
        };
        itemsRef.push(item);
        this.setState({
            currentItem: '',
            username: ''
        });
    }

    static removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
    }

    render() {
        return (
            <div class="box">
                <header class="row header">
                    <div className="wrapper">
                        <h1>Fun Food Friends</h1>
                        {this.state.user ?
                            <button onClick={this.logout}>Logout</button>
                            :
                            <button onClick={this.login}>Log In</button>
                        }
                    </div>
                </header>
                <section class="row content">
                    {this.state.user ?
                        <MapComponent />
                        :
                        <div className='wrapper'>
                            <p>You must be logged in to see the potluck list and submit to it.</p>
                        </div>
                    }

                </section>
                <footer class="row footer">
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
