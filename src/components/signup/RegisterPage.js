import React, { Component } from 'react';
import MapComponentContainer from '../../containers/mapComponentContainer';
import SearchBoxContainer from '../../containers/searchBoxContainer';
import './RegisterPage.css';

class SignupPage extends Component {
    render() {
        return (

            <div className={'SignupPage'}>
                <div className={'search-box'}>
                    <SearchBoxContainer/>
                </div>
                <div className={'map'}>
                    <MapComponentContainer/>
                </div>
            </div>
        );
    }
}

export default SignupPage;