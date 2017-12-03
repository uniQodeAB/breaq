import React, { Component } from 'react';
import SearchBox from '../SearchBox';
import MapComponent from '../MapComponent';
import { Marker } from 'react-google-maps';
import _ from 'lodash';
import './RegisterPage.css';

class RegisterPage extends Component {
    renderMarker = (base) => {
        return !_.isEmpty(base.location) && <Marker position={base.location} icon={'https://vignette.wikia.nocookie.net/pkmnshuffle/images/b/b1/Pikachu_%28Winking%29.png/revision/latest?cb=20170410234514'}/>;
    };

    render() {
        const {base, setHomeBase, saveHomeBase} = this.props;

        return (
            <div className={'RegisterPage'}>
                <div className={'search-box-pane'}>
                    <div className={'search'}>
                        <div className={'search-box'}>
                            <SearchBox onChangePlace={setHomeBase}/>
                        </div>
                        <Address address={base}/>

                        <button onClick={saveHomeBase}>Save</button>
                    </div>


                </div>
                <div className={'map-pane'}>
                    <MapComponent center={base.location}>
                        {this.renderMarker(base)}
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
                         dangerouslySetInnerHTML={{__html: props.address.htmlAddress.split(',').join('')}}/>
                </div>
            </div>
            }

        </div>
    )
};

export default RegisterPage;