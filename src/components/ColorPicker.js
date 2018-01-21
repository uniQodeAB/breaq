import React, { Component } from 'react';

import colors from '../styles/colors.json';
import '../styles/ColorPicker.css';

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    const getRandomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const selectedColor = colors[getRandomInt(0, colors.length - 1)];
    this.state = {
      selectedColor,
      toggleColapse: false
    };
  }

  render() {
    const { selectedColor, toggleColapse } = this.state;

    return (
      <div className={'ColorPicker'}>
        <div
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
          <div className={'color-grid'}>
            {colors.map(color => (
              <div
                className={'color'}
                style={{ background: `${color}` }}
                role={'button'}
                onClick={() => {
                  this.setState({
                    selectedColor: color,
                    toggleColapse: false
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ColorPicker;
