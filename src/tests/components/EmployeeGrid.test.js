import React from 'react';
import { shallow } from 'enzyme';

import EmployeeGrid from '../../components/EmployeeGrid';

describe('EmployeeGrid', () => {
  let props;

  beforeEach(() => {
    props = {
      companyId: 'id',
      color: '#abc'
    };
  });

  describe('when no employees', () => {
    it('should render an empty grid', () => {
      const employeeGrid = shallow(<EmployeeGrid employees={[]} {...props} />);
      expect(employeeGrid.find('.EmployeeGrid .grid').children().length).toBe(
        0
      );
    });
  });

  describe('when employees exist', () => {
    const employee = {
      id: 'id',
      name: 'name',
      project: 'project',
      address: {
        streetAddress: 'streetAddress'
      },
      belongsToCompany: '1'
    };

    it('should be able to render one employee', () => {
      const employees = [employee];
      const employeeGrid = shallow(
        <EmployeeGrid employees={employees} {...props} />
      );

      expect(
        employeeGrid.find('.EmployeeGrid .employee-grid').children().length
      ).toBe(1);
    });

    it('should be able to render multiple employees', () => {
      const employee1 = { ...employee, id: 'id1' };
      const employee2 = { ...employee, id: 'id2' };
      const employee3 = { ...employee, id: 'id3' };

      const employees = [employee1, employee2, employee3];
      const employeeGrid = shallow(
        <EmployeeGrid employees={employees} {...props} />
      );

      expect(
        employeeGrid.find('.EmployeeGrid .employee-grid').children().length
      ).toBe(3);
    });
  });
});
