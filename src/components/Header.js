import React from 'react';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import '../styles/Header.css';

const Header = ({ firebase, auth, login, logout }) => {
  const renderButtons = () =>
    isEmpty(auth) ? (
      <button className={'login'} onClick={login}>
        Log In
      </button>
    ) : (
      <button className={'user-profile'} onClick={logout}>
        {!isEmpty(auth) && <img src={auth.photoURL} alt={'Logout'} />}
      </button>
    );

  return (
    <header className={'row header Header'}>
      <div className="wrapper">
        <h1>EMP maps</h1>
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
