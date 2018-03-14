import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';

const Header = ({ login, logout, isLoggedOut, photo }) => {
  const renderButtons = () =>
    isLoggedOut ? (
      <button className={'login'} onClick={login}>
        Log In
      </button>
    ) : (
      <button className={'user-profile'} onClick={logout}>
        <img src={photo} alt={'Logout'} />
      </button>
    );

  return (
    <header className={'row header Header'}>
      <div className="wrapper">
        <h1>Breaq</h1>
        {renderButtons()}
      </div>
    </header>
  );
};

Header.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedOut: PropTypes.bool,
  photo: PropTypes.string
};

Header.defaultProps = {
  isLoggedOut: true,
  photo: ''
};

export default Header;
