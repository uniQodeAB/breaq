import React from 'react';

import { shallow } from 'enzyme';
import Company from '../../components/Company';

jest.mock('../../containers/CompanyInfoBoxContainer', () => 'CompanyInfoBox');

jest.mock('../../containers/CompanyEditorContainer', () => 'CompanyEditor');

jest.mock('../../containers/EmployeeEditorContainer', () => 'EmployeeEditor');

describe('Company', () => {
  let company;
  let props;

  beforeEach(() => {
    props = {
      company: {
        id: 'id',
        name: 'name',
        address: {},
        location: {},
        color: 'color',
        employees: {
          a: {
            id: '1',
            name: 'Kalle'
          },
          b: {
            id: '2',
            name: 'Lisa'
          },
          c: {
            id: '3',
            name: 'Pelle'
          }
        }
      }
    };

    company = shallow(<Company {...props} />);
  });

  describe('when editCompany is false', () => {
    beforeEach(() => {
      props.editCompany = false;
      company = shallow(<Company {...props} />);
    });

    it('should render a `CompanyInfoBox', () => {
      expect(company.find('CompanyInfoBox').length).toBe(1);
    });

    describe('the rendered `CompanyInfoBox`', () => {
      it('should take props', () => {
        expect(company.find('CompanyInfoBox').props()).toEqual({
          address: props.company.address,
          color: props.company.color,
          companyId: props.company.id,
          title: props.company.name
        });
      });
    });

    it('should not render a `CompanyEditor`', () => {
      expect(company.find('CompanyEditor').length).toBe(0);
    });
  });

  describe('when editCompany is true', () => {
    beforeEach(() => {
      props.editCompany = true;
      company = shallow(<Company {...props} />);
    });

    it('Should render a `CompanyEditor`', () => {
      expect(company.find('CompanyEditor').length).toBe(1);
    });

    describe('the rendered `CompanyEditor`', () => {
      it('should accept a single prop with the company', () => {
        expect(company.find('CompanyEditor').props()).toEqual({
          company: props.company
        });
      });
    });

    it('should not render a `CompanyInfoBox`', () => {
      expect(company.find('CompanyInfoBox').length).toBe(0);
    });
  });

  describe('when addEmployee and editEmployee is false', () => {
    beforeEach(() => {
      company = shallow(<Company {...props} />);
    });

    it('should render a `EmployeeGrid`', () => {
      expect(company.find('EmployeeGrid').length).toBe(1);
    });

    describe('The rendered `EmployeeGrid', () => {
      it('should accept props company id, color and array of employees', () => {
        expect(company.find('EmployeeGrid').props()).toEqual({
          active: false,
          companyId: props.company.id,
          color: props.company.color,
          employees: [
            { id: '1', name: 'Kalle' },
            { id: '2', name: 'Lisa' },
            { id: '3', name: 'Pelle' }
          ]
        });
      });
    });

    it('should not render a `EmployeeEditor', () => {
      expect(company.find('EmployeeEditor').length).toBe(0);
    });
  });

  describe('when addEmployee and/or editEmployee is true', () => {
    beforeEach(() => {
      props.addEmployee = true;
      props.editEmployee = true;
      props.editEmployeeId = '1';
      company = shallow(<Company {...props} />);
    });

    it('should render a `EmployeeEditor', () => {
      expect(company.find('EmployeeEditor').length).toBe(1);
    });

    describe('The rendered `EmployeeEditor', () => {
      it('should accept props company id, color and array of employees', () => {
        expect(company.find('EmployeeEditor').props()).toEqual({
          companyId: props.company.id,
          color: props.company.color,
          employeeId: '1'
        });
      });
    });

    it('should not render a `EmployeeGrid`', () => {
      expect(company.find('EmployeeGrid').length).toBe(0);
    });
  });

  describe('when there are no employees', () => {
    beforeEach(() => {
      props.company.employees = {};
      company = shallow(<Company {...props} />);
    });

    it('should render `EmployeeGrid` with an empty array of employees', () => {
      expect(company.find('EmployeeGrid').props()).toEqual({
        active: false,
        companyId: props.company.id,
        color: props.company.color,
        employees: []
      });
    });
  });
});
