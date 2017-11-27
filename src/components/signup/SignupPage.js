import React, { Component } from 'react';
import StandaloneSearchboxContainer from '../../containers/searchboxContainer';
import StupidMapComponentContainer from '../../containers/stupidMapComponentContainer';

class SignupPage extends Component {
    render() {
        return (
            <div>
                <div>
                    <StandaloneSearchboxContainer/>
                </div>
                <div>
                    <StupidMapComponentContainer/>
                </div>
            </div>
        );
    }
}

export default SignupPage;