import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EmployeeCreator from './EmployeeCreator';

describe('EmployeeCreator', () => {
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
    let EmployeeCreator;
    let otherProps;

    beforeEach(() => {
      otherProps = {
        ...props,
        editMode: false,
        addMode: false
      };
      EmployeeCreator = shallow(<EmployeeCreator {...otherProps} />);
    });

    it('should render an `Add` button', () => {
      expect(EmployeeCreator.find('button').get(0)).toEqual(
        <button onClick={otherProps.initAddEmployee}>Add</button>
      );
    });
  });

  describe('when in editMode', () => {
    let EmployeeCreator;
    let otherProps;

    beforeEach(() => {
      otherProps = {
        ...props,
        editMode: true,
        addMode: false
      };
      EmployeeCreator = shallow(<EmployeeCreator {...otherProps} />);
    });

    it('should always render two inputs', () => {
      expect(EmployeeCreator.find('input').length).toBe(2);
    });

    it('should always render a `SearchBox`', () => {
      expect(EmployeeCreator.find('SearchBox').length).toBe(1);
    });

    it('should always render a `AddressBox`', () => {
      expect(EmployeeCreator.find('AddressBox').length).toBe(1);
    });

    it('should always render a cancel button', () => {
      expect(EmployeeCreator.find('button').get(0)).toEqual(
        <button onClick={otherProps.cancelAddEmployee}>Cancel</button>
      );
    });

    it('should render an update button', () => {
      expect(EmployeeCreator.find('button.update').length).toBe(1);
    });

    it('should not render an add button', () => {
      expect(EmployeeCreator.find('button.add').length).toBe(0);
    });
  });

  describe('when in addMode', () => {
    let EmployeeCreator;
    let otherProps;

    beforeEach(() => {
      otherProps = {
        ...props,
        editMode: false,
        addMode: true
      };
      EmployeeCreator = shallow(<EmployeeCreator {...otherProps} />);
    });

    it('should always render two inputs', () => {
      expect(EmployeeCreator.find('input').length).toBe(2);
    });

    it('should always render a `SearchBox`', () => {
      expect(EmployeeCreator.find('SearchBox').length).toBe(1);
    });

    it('should always render a `AddressBox`', () => {
      expect(EmployeeCreator.find('AddressBox').length).toBe(1);
    });

    it('should always render a cancel button', () => {
      expect(EmployeeCreator.find('button').get(0)).toEqual(
        <button onClick={otherProps.cancelAddEmployee}>Cancel</button>
      );
    });

    it('should render an add button', () => {
      expect(EmployeeCreator.find('button.add').length).toBe(1);
    });

    it('should not render an update button', () => {
      expect(EmployeeCreator.find('button.update').length).toBe(0);
    });
  });
});
