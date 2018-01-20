import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Company from '../../components/Company';

describe('Company', () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  it('should remember to update these tests', () => {
    expect(true).toBe(false);
  });

  /* describe('when a company does not yet exist', () => {
    const props = {
      company: ''
    };
    let company;

    beforeEach(() => {
      company = shallow(<Company {...props} />);
    });

    it('should render a `MarkerCreator` to create a company', () => {
      expect(company.find('div.Company div.company MarkerCreator').length).toBe(
        1
      );
    });

    it('should not show an `InfoBox` for the company', () => {
      expect(company.find('div.Company div.company InfoBox').length).toBe(0);
    });

    it('should not show any employees', () => {
      expect(company.find('div.Company div.employees').children().length).toBe(
        0
      );
    });
  });

  describe('when a company already exists', () => {
    let props = {
      company: 'id'
    };
    let company;

    beforeEach(() => {
      company = shallow(<Company {...props} />);
    });

    it('should not show the `MarkerCreator`', () => {
      expect(company.find('div.Company div.company MarkerCreator').length).toBe(
        0
      );
    });

    it('should show an `InfoBox` for the company', () => {
      expect(company.find('div.Company div.company InfoBox').length).toBe(1);
    });

    describe('when no employees yet exist', () => {
      beforeEach(() => {
        props = {
          ...props,
          employees: []
        };

        company = shallow(<Company {...props} />);
      });

      it('should allow adding employees', () => {
        expect(
          company.find('div.Company div.employees MarkerCreator').length
        ).toBe(1);
      });

      it('should show `EmployeeGrid`', () => {
        expect(
          company
            .find('div.Company div.employees EmployeeGrid')
            .first()
            .children().length
        ).toBe(0);
      });

      it('should provide `EmployeeGrid` with an empty array', () => {
        expect(
          company
            .find('div.Company div.employees EmployeeGrid')
            .first()
            .props().employees
        ).toEqual([]);
      });
    });

    describe('when some employees exists', () => {
      beforeEach(() => {
        props = {
          ...props,
          employees: [
            {
              name: 'Test employee'
            }
          ]
        };
        company = shallow(<Company {...props} />);
      });

      it('should allow adding employees', () => {
        expect(
          company.find('div.Company div.employees MarkerCreator').length
        ).toBe(1);
      });

      it('should show `EmployeeGrid`', () => {
        expect(
          company
            .find('div.Company div.employees EmployeeGrid')
            .first()
            .children().length
        ).toBe(0);
      });

      it('should provide `EmployeeGrid` with the employee', () => {
        expect(
          company
            .find('div.Company div.employees EmployeeGrid')
            .first()
            .props().employees
        ).toEqual(props.employees);
      });
    });
  }); */
});
