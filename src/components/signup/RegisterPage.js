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
                    <div className={'input-control'}>
                        <SearchBox onChangePlace={this.props.setHomeBase}/>
                        <Address address={this.props.base}/>
                    </div>
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
        <div class="wrapper">
            <div class="one">One</div>
            <div class="two">Two</div>
            <div class="three">Three</div>
            <div class="four">Four</div>
            <div class="five">Five</div>
            <div class="six">Six</div>
        </div>
        /*
        <div className={'Address'}>
            {props.address.name &&
                <div>
                    <div>
                        <i className={'fa fa-home'} aria-hidden={'true'} />
                    </div>
                    <div>
                        <span>{props.address.formatted_address}</span>
                    </div>
                </div>
            }
        </div>*/
    )
};

export default RegisterPage;