import React, { Component } from 'react';
import './RegisterComponent.css';
import MySearchBox from './MySearchBox';

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
                <div>
                    Hello
                </div>
                <MySearchBox/>
            </div>
        );
    }
}

export default RegisterComponent;