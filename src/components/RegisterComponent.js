import React, { Component } from 'react';
import './RegisterComponent.css';
import GSearchBox from "./GSearchBox";
import './RegisterComponent.css';

class RegisterComponent extends Component {

    constructor() {
        super();

        this.state = {
            address: null
        }
    }

    render() {
        return (
            <div className={'RegisterComponent'}>
                <GSearchBox />
            </div>
        );
    }
}

export default RegisterComponent;