import React, { Component } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import SignUpComponent from './components/SignUpComponent';
import RegisterComponent from './components/RegisterComponent';
import _ from 'lodash';

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
                <header className={'row header'}>
                    <div className="wrapper">
                        <h1>Fun Food Friends</h1>
                        {_.isEmpty(this.props.user.user) ?
                            <button onClick={this.login}>Log In</button>
                            :
                            <button onClick={this.logout}>Logout</button>
                        }
                    </div>
                </header>
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
                <footer className={'row footer'}>
                    <p><b>footer</b> (fixed height)</p>
                        <div className='user-profile'>
                            {_.isEmpty(this.props.user.user) ?
                                <p>&nbsp;</p>
                                :
                                <img src={this.props.user.user.photoURL} alt={''}/>
                            }
                        </div>
                </footer>
            </div>

        );
  }
}

export default App;
