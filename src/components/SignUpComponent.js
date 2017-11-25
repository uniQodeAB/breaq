import React, { Component } from 'react';
import './SignUpComponent.css';

class SignUpComponent extends Component {
    render() {
        return (
            <div className={'SignUpComponent'}>
                <p>You must be logged in to see the potluck list and submit to it.</p>

                <button>Sign up</button>
            </div>
        );
    }
}

export default SignUpComponent;