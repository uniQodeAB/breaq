import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Button.css';

const Button = ({ onClick, children }) => (
  <button className={'Button'} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  onClick: () => {}
};

export default Button;
