import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types';
import { compose } from 'redux';

const Footer = ({auth}) => {
    return (
        <footer className={'row footer'}>
            <div className='user-profile'>
                {
                    !isEmpty(auth) && <img src={auth.photoURL} alt={''}/>
                }
            </div>
        </footer>
    );
};

Footer.propTypes = {
    auth: PropTypes.object
};

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(
        ({ firebase: { auth } }) => ({ auth }))
)(Footer)
