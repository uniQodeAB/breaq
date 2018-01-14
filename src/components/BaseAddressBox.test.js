import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BaseAddressBox from './BaseAddressBox';

describe('BaseAddressBox', () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  describe('when in editMode', () => {
    let baseAddressBox;
    let props;

    beforeEach(() => {
      props = {
        editMode: true,
        firebase: {},
        auth: {},
        initEdit: () => {},
        cancelEdit: () => {},
        base: {}
      };
      baseAddressBox = shallow(<BaseAddressBox {...props} />);
    });

    it('should render a searchbox', () => {
      expect(baseAddressBox.find('SearchBox').length).toBe(1);
    });

    describe('the rendered searchbox', () => {
      it('should take props', () => {
        const searchBox = baseAddressBox.find('SearchBox').first();
        expect(Object.keys(searchBox.props()).length).toBeGreaterThan(0);
      });
    });

    it('should render a button for cancel', () => {
      expect(baseAddressBox.find('button').length).toBe(1);
    });

    describe('the rendered button', () => {
      it(' should say cancel and should call cancelEdit onclick', () => {
        expect(
          baseAddressBox.contains(
            <button onClick={props.cancelEdit}>Cancel</button>
          )
        ).toBe(true);
      });
    });
  });

  describe('when base is missing', () => {
    let baseAddressBox;
    let props;

    beforeEach(() => {
      props = {
        editMode: false,
        firebase: {},
        auth: {},
        initEdit: () => {},
        cancelEdit: () => {},
        base: undefined
      };

      baseAddressBox = shallow(<BaseAddressBox {...props} />);
    });

    it('should render a searchbox', () => {
      expect(baseAddressBox.find('SearchBox').length).toBe(1);
    });

    describe('the rendered searchbox', () => {
      it('should take props', () => {
        const searchBox = baseAddressBox.find('SearchBox').first();
        expect(Object.keys(searchBox.props()).length).toBeGreaterThan(0);
      });
    });

    describe('when editMode is false', () => {
      it('should not render a button', () => {
        expect(baseAddressBox.find('button').length).toBe(0);
      });
    });

    describe('when editMode is true', () => {
      let otherBaseAddressBox;
      let otherProps;

      beforeEach(() => {
        otherProps = {
          editMode: true,
          firebase: {},
          auth: {},
          initEdit: () => {},
          cancelEdit: () => {},
          base: undefined
        };

        otherBaseAddressBox = shallow(<BaseAddressBox {...otherProps} />);
      });

      it('should render a button', () => {
        expect(otherBaseAddressBox.find('button').length).toBe(1);
      });
    });
  });
});
