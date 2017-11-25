import React, { Component } from 'react';
import GMap from './GMap';
import './MapComponent.css';

class MapComponent extends Component {
    render() {
        return (
            <div className={'MapComponent'}>
                <GMap/>
            </div>
        );
    }
}

export default MapComponent;
