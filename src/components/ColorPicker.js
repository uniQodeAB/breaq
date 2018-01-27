import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseOnEscape from 'react-close-on-escape';

import OutsideClickDetecter from './OutsideClickDetecter';
import colors from '../styles/colors.json';
import '../styles/ColorPicker.css';

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    const { color, onColorChange } = props;

    if (color) {
      this.state = {
        selectedColor: color,
        toggleColapse: false
      };
    } else {
      const getRandomInt = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

      const selectedColor = colors[getRandomInt(0, colors.length - 1)];
      this.state = {
        selectedColor,
        toggleColapse: false
      };
      onColorChange(selectedColor);
    }
  }

  render() {
    const { onColorChange } = this.props;
    const { selectedColor, toggleColapse } = this.state;

    const handleClose = () => {
      this.setState({
        toggleColapse: false
      });
    };

    return (
      <div className={'ColorPicker'}>
        <div className={'border'}>
          <div
            tabIndex={'0'}
            className={'color'}
            role={'button'}
            style={{ background: `${selectedColor}` }}
            onClick={() => {
              this.setState({
                toggleColapse: !toggleColapse
              });
            }}
          />

          {toggleColapse && (
            <CloseOnEscape onEscape={handleClose}>
              <OutsideClickDetecter handler={handleClose}>
                <div className={'color-grid'}>
                  {colors.map(color => (
                    <div
                      tabIndex={'0'}
                      key={color}
                      className={'color'}
                      style={{ background: `${color}` }}
                      role={'button'}
                      onClick={() => {
                        onColorChange(color);

                        this.setState({
                          selectedColor: color,
                          toggleColapse: false
                        });
                      }}
                    />
                  ))}
                </div>
              </OutsideClickDetecter>
            </CloseOnEscape>
          )}
        </div>
      </div>
    );
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string,
  onColorChange: PropTypes.func.isRequired
};

ColorPicker.defaultProps = {
  color: ''
};

export default ColorPicker;
