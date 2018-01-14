import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EmployeeGrid from './EmployeeGrid';

describe('EmployeeGrid', () => {
  let props;

  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });

    props = {
      firebase: () => {},
      auth: () => {}
    };
  });

  it('should not render grid if no employees', () => {
    const employeeGrid = shallow(<EmployeeGrid {...props} />);

    expect(employeeGrid.find('div.grid').children().length).toBe(0);
  });

  it('should render a single employee if only one exist', () => {
    const employees = { employee: {} };

    const employeeGrid = shallow(
      <EmployeeGrid employees={employees} {...props} />
    );

    expect(employeeGrid.find('AddressBox').length).toBe(1);
  });

  it('should render all employees', () => {
    const employees = { employee1: {}, employee2: {}, employee3: {} };

    const employeeGrid = shallow(
      <EmployeeGrid employees={employees} {...props} />
    );

    expect(employeeGrid.find('AddressBox').length).toBe(3);
  });

  it('should render an AdressBox for each employee with props', () => {
    const location = {};

    const employees = { employee1: location };

    const employeeGrid = shallow(
      <EmployeeGrid employees={employees} initEdit={() => {}} {...props} />
    );

    const addressBox = employeeGrid.find('AddressBox').first();

    expect(addressBox.props().id).toBe('employee1');
    expect(addressBox.props().location).toBe(location);
    expect(addressBox.props().icon).toBe('USER');
    expect(addressBox.props().onDelete).toBeInstanceOf(Function);
    expect(addressBox.props().onEdit).toBeInstanceOf(Function);
  });
});
