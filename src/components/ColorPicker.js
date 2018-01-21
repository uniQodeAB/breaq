import React, { Component } from 'react';

import colors from '../styles/colors.json';
import '../styles/ColorPicker.css';

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    const { color, addColor, changeColor, companyId } = props;

    if (color && companyId) {
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
      addColor(selectedColor);
    }
  }

  render() {
    const { companyId, changeColor, addColor } = this.props;
    const { selectedColor, toggleColapse } = this.state;

    return (
      <div className={'ColorPicker'}>
        <div className={'border'}>
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
                  key={color}
                  className={'color'}
                  style={{ background: `${color}` }}
                  role={'button'}
                  onClick={() => {
                    if (companyId) {
                      changeColor(companyId, color);
                    } else {
                      addColor(color);
                    }

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
      </div>
    );
  }
}

export default ColorPicker;
