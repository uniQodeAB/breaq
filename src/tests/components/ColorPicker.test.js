import React from 'react';
import { shallow } from 'enzyme';

import ColorPicker from '../../components/ColorPicker';
import colors from '../../styles/colors.json';

// Essentially mock the getRandomInt method
const mockMath = Object.create(global.Math);
mockMath.floor = () => 9;
global.Math = mockMath;

describe('ColorPicker', () => {
  let colorPicker;
  let mockColorChange;

  beforeEach(() => {
    mockColorChange = jest.fn();
    colorPicker = shallow(<ColorPicker onColorChange={mockColorChange} />);
  });

  it('should be toggled off by default', () => {
    expect(colorPicker.state().toggleColapse).toBe(false);
  });

  describe('when toggled off', () => {
    it('should not show a color grid to choose from', () => {
      expect(colorPicker.find('.color-grid').length).toBe(0);
    });
  });

  it('should always show a div with the current selected color', () => {
    expect(colorPicker.find('.color').get(0).props.style.background).toBe(
      colorPicker.state().selectedColor
    );
  });

  describe('when no color on props', () => {
    it('should choose a random color', () => {
      // random is mocked to always return the 9th color
      expect(colorPicker.state().selectedColor).toBe(colors[9]);
    });

    it('should call onColorChange with the random color', () => {
      expect(mockColorChange.mock.calls[0][0]).toBe(colors[9]);
    });
  });

  describe('when color on props', () => {
    beforeEach(() => {
      colorPicker = shallow(
        <ColorPicker onColorChange={mockColorChange} color={'#000000'} />
      );
    });

    it('should set that color as its selectedColor', () => {
      expect(colorPicker.state().selectedColor).toBe('#000000');
    });
  });

  describe('when color button is clicked', () => {
    beforeEach(() => {
      colorPicker = shallow(
        <ColorPicker onColorChange={mockColorChange} color={'#000000'} />
      );
      colorPicker
        .find('.color')
        .first()
        .simulate('click');
    });

    it('should change toggle state to true', () => {
      expect(colorPicker.state().toggleColapse).toBe(true);
    });

    it('should show the color grid', () => {
      expect(colorPicker.find('.color-grid').length).toBe(1);
    });

    describe('the rendered color grid', () => {
      it('should contain all colors in colors.json', () => {
        expect(colorPicker.find('.color-grid').find('.color').length).toBe(
          colors.length
        );
      });

      describe('when color in color grid is clicked', () => {
        let firstColor;

        beforeEach(() => {
          mockColorChange = jest.fn();
          colorPicker = shallow(
            <ColorPicker onColorChange={mockColorChange} color={'#000000'} />
          );
          colorPicker
            .find('.color')
            .first()
            .simulate('click');
          firstColor = colorPicker
            .find('.color-grid')
            .find('.color')
            .first();
          firstColor.simulate('click');
        });

        it('should change selectedColor to the clicked color', () => {
          expect(colorPicker.state().selectedColor).toBe(
            firstColor.props().style.background
          );
        });

        it('should have called onColorChange callback with the selected color', () => {
          expect(mockColorChange.mock.calls[0][0]).toBe(colors[0]);
        });

        it('should reset toggle state to false', () => {
          expect(colorPicker.state().toggleColapse).toBe(false);
        });
      });
    });

    it('should set toggle to false if click outside of component', () => {
      expect(colorPicker.find('OutsideClickDetecter').length).toBe(1);

      colorPicker
        .find('OutsideClickDetecter')
        .props()
        .handler();

      expect(colorPicker.state().toggleColapse).toBe(false);
    });
  });
});
