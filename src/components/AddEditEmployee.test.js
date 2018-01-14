import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddEditEmployee from './AddEditEmployee';

describe('AddEditEmployee', () => {
  let props;

  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });

    props = {
      firebase: {},
      auth: {},
      initAddEmployee: () => {},
      cancelAddEmployee: () => {}
    };
  });

  describe('when not in addMode or editMode', () => {
    let addEditEmployee;
    let otherProps;

    beforeEach(() => {
      otherProps = {
        ...props,
        editMode: false,
        addMode: false
      };
      addEditEmployee = shallow(<AddEditEmployee {...otherProps} />);
    });

    it('should render an `Add` button', () => {
      expect(addEditEmployee.find('button').get(0)).toEqual(
        <button onClick={otherProps.initAddEmployee}>Add</button>
      );
    });
  });

  describe('when in editMode', () => {
    let addEditEmployee;
    let otherProps;

    beforeEach(() => {
      otherProps = {
        ...props,
        editMode: true,
        addMode: false
      };
      addEditEmployee = shallow(<AddEditEmployee {...otherProps} />);
    });

    it('should always render two inputs', () => {
      expect(addEditEmployee.find('input').length).toBe(2);
    });

    it('should always render a `SearchBox`', () => {
      expect(addEditEmployee.find('SearchBox').length).toBe(1);
    });

    it('should always render a `AddressBox`', () => {
      expect(addEditEmployee.find('AddressBox').length).toBe(1);
    });

    it('should always render a cancel button', () => {
      expect(addEditEmployee.find('button').get(0)).toEqual(
        <button onClick={otherProps.cancelAddEmployee}>Cancel</button>
      );
    });

    it('should render an update button', () => {
      expect(addEditEmployee.find('button.update').length).toBe(1);
    });

    it('should not render an add button', () => {
      expect(addEditEmployee.find('button.add').length).toBe(0);
    });
  });

  describe('when in addMode', () => {
    let addEditEmployee;
    let otherProps;

    beforeEach(() => {
      otherProps = {
        ...props,
        editMode: false,
        addMode: true
      };
      addEditEmployee = shallow(<AddEditEmployee {...otherProps} />);
    });

    it('should always render two inputs', () => {
      expect(addEditEmployee.find('input').length).toBe(2);
    });

    it('should always render a `SearchBox`', () => {
      expect(addEditEmployee.find('SearchBox').length).toBe(1);
    });

    it('should always render a `AddressBox`', () => {
      expect(addEditEmployee.find('AddressBox').length).toBe(1);
    });

    it('should always render a cancel button', () => {
      expect(addEditEmployee.find('button').get(0)).toEqual(
        <button onClick={otherProps.cancelAddEmployee}>Cancel</button>
      );
    });

    it('should render an add button', () => {
      expect(addEditEmployee.find('button.add').length).toBe(1);
    });

    it('should not render an update button', () => {
      expect(addEditEmployee.find('button.update').length).toBe(0);
    });
  });
});
