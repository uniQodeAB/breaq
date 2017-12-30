import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddressBoxContainer from './AddressBoxContainer';
import SearchBoxControlsContainer from './SearchBoxControlsContainer';

class PositionBox extends Component {
  render() {
    return (
      <div>
        <SearchBoxControlsContainer onChangePlace={this.props.onChangePlace} />
        <AddressBoxContainer />
      </div>
    );
  }
}

PositionBox.propTypes = {
  onChangePlace: PropTypes.func.isRequired
};

export default PositionBox;
