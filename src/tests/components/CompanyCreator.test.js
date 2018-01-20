import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CompanyCreator from '../../components/CompanyCreator';

describe('CompanyCreator', () => {
  let props;
  let companyCreator;
  let mockPush;
  let mockUpdate;

  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });

    mockPush = jest.fn();
    mockUpdate = jest.fn();
    props = {
      firebase: {
        push: () =>
          new Promise(resolve => {
            resolve(mockPush());
          }),
        ref: () => ({
          update: () =>
            new Promise(resolve => {
              resolve(mockUpdate());
            })
        })
      },
      auth: {},
      endAddCompany: jest.fn(),
      endEditCompany: jest.fn()
    };
    companyCreator = shallow(<CompanyCreator {...props} />);
  });

  it('should always render an input', () => {
    expect(companyCreator.find('input').length).toBe(1);
  });

  it('should always render a `SearchBox`', () => {
    expect(companyCreator.find('SearchBox').length).toBe(1);
  });

  it('should always render two buttons', () => {
    expect(companyCreator.find('button').length).toBe(2);
  });

  describe('when no company on props', () => {
    it('should have a state with an empty name', () => {
      expect(companyCreator.state()).toEqual({
        company: {
          name: ''
        }
      });
    });

    describe('the rendered input', () => {
      it('should be empty', () => {
        expect(
          companyCreator
            .find('input')
            .first()
            .props().value
        ).toBe('');
      });
    });

    it('should not render an `InfoBox` because both name and address is missing', () => {
      expect(companyCreator.find('InfoBox').length).toBe(0);
    });

    describe('the rendered buttons', () => {
      it('should have a cancel button', () => {
        expect(companyCreator.find('button').get(0)).toEqual(
          <button onClick={props.endAddCompany}>Cancel</button>
        );
      });

      describe('the cancel button', () => {
        it('should call endAddCompany on click', () => {
          companyCreator
            .find('button')
            .at(0)
            .simulate('click');
          expect(props.endAddCompany.mock.calls.length).toEqual(1);
        });
      });

      it('should have a save button', () => {
        expect(
          companyCreator
            .find('button')
            .at(1)
            .text()
        ).toBe('Save');
      });

      describe('the save button', () => {
        it('should add a new company on click', () => {
          companyCreator
            .find('button')
            .at(1)
            .simulate('click');
          expect(mockPush.mock.calls.length).toEqual(1);

          // The state should be reset
          expect(companyCreator.state()).toEqual({
            company: {
              name: ''
            }
          });
        });
      });
    });
  });

  describe('when company on props', () => {
    const company = {
      name: 'company',
      address: {
        streetAddress: 'street address'
      }
    };

    beforeEach(() => {
      companyCreator = shallow(
        <CompanyCreator company={company} companyId={'id'} {...props} />
      );
    });

    it('should have state set to the company', () => {
      expect(companyCreator.state()).toEqual({
        company
      });
    });

    describe('the rendered input', () => {
      it('should have the name of the company', () => {
        expect(
          companyCreator
            .find('input')
            .first()
            .props().value
        ).toBe('company');
      });
    });

    it('should render an `InfoBox`', () => {
      expect(companyCreator.find('InfoBox').length).toBe(1);
    });

    describe('the rendered buttons', () => {
      it('should have a cancel button', () => {
        expect(companyCreator.find('button').get(0)).toEqual(
          <button onClick={props.endEditCompany}>Cancel</button>
        );
      });

      describe('the cancel button', () => {
        it('should call endAddCompany on click', () => {
          companyCreator
            .find('button')
            .at(0)
            .simulate('click');
          expect(props.endEditCompany.mock.calls.length).toEqual(1);
        });
      });

      it('should have an update button', () => {
        expect(
          companyCreator
            .find('button')
            .at(1)
            .text()
        ).toBe('Update');
      });

      describe('the update button', () => {
        it('should update a company on click', () => {
          companyCreator
            .find('button')
            .at(1)
            .simulate('click');
          expect(mockUpdate.mock.calls.length).toEqual(1);
        });
      });
    });
  });

  /* describe('when not in addMode or editMode', () => {
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
  }); */
});
