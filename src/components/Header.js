import React from 'react';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import '../components/Header.css';

const Header = ({ firebase, auth }) => {
  const renderButtons = () =>
    isEmpty(auth) ? (
      <button
        className={'login'}
        onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
      >
        Log In
      </button>
    ) : (
      <button className={'user-profile'} onClick={() => firebase.logout()}>
        {!isEmpty(auth) && <img src={auth.photoURL} alt={'Logout'} />}
      </button>
    );

  return (
    <header className={'row header Header'}>
      <div className="wrapper">
        <h1>Fun Food Friends</h1>
        {isLoaded(firebase.profile) ? <span>Loading...</span> : renderButtons()}
      </div>
    </header>
  );
};

Header.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }).isRequired,
  auth: PropTypes.shape()
};

Header.defaultProps = {
  auth: {}
};

export default Header;
