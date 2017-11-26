import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className={'row header'}>
                <div className="wrapper">
                    <h1>Fun Food Friends</h1>
                    {this.props.loggedIn ?
                        <button onClick={this.props.logout}>Logout</button>
                        :
                        <button onClick={this.props.login}>Log In</button>
                    }
                </div>
            </header>
        );
    }
}

export default Header;