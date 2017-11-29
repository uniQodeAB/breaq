import React, { Component } from 'react';
import SearchBox from '../SearchBox';
import MapComponent from '../MapComponent';
import { Marker } from 'react-google-maps';
import _ from 'lodash';
import './RegisterPage.css';

class RegisterPage extends Component {
    renderMarker = (base) => {
        return !_.isEmpty(base.geometry) && <Marker position={this.getLocation()}/>;
    };

    getLocation = () => {
        return this.props.base.geometry.location;
    };

    render() {
        return (
            <div className={'RegisterPage'}>
                <div className={'search-box-pane'}>
                    <SearchBox onChangePlace={this.props.setHomeBase}/>
                    <Address address={this.props.base}/>
                </div>
                <div className={'map-pane'}>
                    <MapComponent center={this.getLocation()}>
                        {this.renderMarker(this.props.base)}
                    </MapComponent>
                </div>
            </div>
        );
    }
}

const Address = (props) => {
    return (
        <div className={'Address'}>
            {props.address.name &&
            <div className={'wrapper'}>
                <div className={'side'}>
                    <i className={'fa fa-home'} aria-hidden={'true'}/>
                </div>
                <div className={'content'}>
                    <div className={'container'}
                         dangerouslySetInnerHTML={{__html: props.address.adr_address.split(',').join('')}}/>
                </div>
            </div>
            }

        </div>
    )
};

export default RegisterPage;