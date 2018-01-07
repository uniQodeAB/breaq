import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BaseAddressBoxContainer from '../containers/BaseAddressBoxContainer';
import SearchBoxControlsContainer from '../containers/SearchBoxControlsContainer';

class HomeBaseBox extends Component {
  render() {
    return (
      <div className={'HomeBaseBox'}>
        <SearchBoxControlsContainer
          onChangePlace={this.props.onChangePlace}
          searchBoxPlaceholder={'Where is your home base?'}
        />
        <BaseAddressBoxContainer />
      </div>
    );
  }
}

HomeBaseBox.propTypes = {
  onChangePlace: PropTypes.func.isRequired
};

export default HomeBaseBox;
