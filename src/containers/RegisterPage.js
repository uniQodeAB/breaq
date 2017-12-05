import { connect } from 'react-redux';
import { setHomeBase } from '../actions/settingsActions';
import React from 'react';
import SearchBox from '../components/SearchBox';
import MapComponent from '../components/MapComponent';
import { Marker } from 'react-google-maps';
import _ from 'lodash';
import '../components/signup/RegisterPage.css';
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { push } from 'react-router-redux'

const RegisterPage = ({base, setBase, firebase, auth, changeRoute}) => {
    const renderMarker = (base) => {
        return !_.isEmpty(base) &&
            <Marker position={base.location} icon={'https://vignette.wikia.nocookie.net/pkmnshuffle/images/b/b1/Pikachu_%28Winking%29.png/revision/latest?cb=20170410234514'}/>;
    };

    return (
        <div className={'RegisterPage'}>
            <div className={'search-box-pane'}>
                <div className={'search'}>
                    <div className={'search-box'}>
                        <SearchBox onChangePlace={setBase}/>
                    </div>
                    <Address address={base}/>

                    {!_.isEmpty(base) &&
                    <button onClick={() => {
                        firebase.set(`/users/${auth.uid}/settings`, {
                            ...base, location: {
                                lat: base.location.lat(),
                                lng: base.location.lng()
                            }
                        }).then(() => {
                            changeRoute('/dashboard')
                        });
                    }}>Save</button>}
                </div>
            </div>
            <div className={'map-pane'}>
                <MapComponent center={base.location}>
                    {renderMarker(base)}
                </MapComponent>
            </div>
        </div>
    );
};

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

function mapStateToProps(state) {
    return {
        base: state.settings.base,
        auth: state.firebase.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setBase: (location) => dispatch(setHomeBase(location)),
        changeRoute: (path) => dispatch(push(path))
    };
}

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps))(RegisterPage)


