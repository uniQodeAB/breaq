import React from 'react';

import { shallow, mount } from 'enzyme';
import CompanyEditor from '../../components/CompanyEditor';

import configureEnzyme from '../testUtil.test';

configureEnzyme();

jest.mock('../../components/Editor', () => ({
  EditorInput: () => <div />,
  EditorSearchBox: () => <div />,
  EditorButtons: () => <div />
}));

describe('CompanyCreator', () => {
  let props;
  let companyEditor;

  beforeEach(() => {
    props = {
      endAddCompany: jest.fn(),
      endEditCompany: jest.fn(),
      addCompany: jest.fn(),
      updateCompany: jest.fn(),
      placeholders: {
        name: 'Test name'
      },
      company: {}
    };
    companyEditor = shallow(<CompanyEditor {...props} />);
  });

  describe('when no company is on props', () => {
    it('should create a default company with an empty name', () => {
      expect(companyEditor.state()).toEqual({
        company: {
          name: ''
        }
      });
    });
  });

  describe('when company is on props', () => {
    beforeEach(() => {
      props.company = {
        id: '123',
        name: 'Test company'
      };

      companyEditor = shallow(<CompanyEditor {...props} />);
    });

    it('should copy this company to the state', () => {
      expect(companyEditor.state()).toEqual({ company: { ...props.company } });
      expect(companyEditor.state().company).toEqual(props.company);
      expect(companyEditor.state().comapny).not.toBe(props.company);
    });
  });

  it('should always render an `EditorInput`', () => {
    expect(companyEditor.find('EditorInput').length).toBe(1);
  });

  describe('the rendered `EditorInput`', () => {
    it('should accept props onChange, placeholder and value', () => {
      expect(companyEditor.find('EditorInput').props().onChange).not.toBe(
        undefined
      );
      expect(companyEditor.find('EditorInput').props().placeholder).toBe(
        props.placeholders.name
      );
      expect(companyEditor.find('EditorInput').props().value).toBe(
        companyEditor.state().company.name
      );
    });

    it('should update name state onChange', () => {
      companyEditor
        .find('EditorInput')
        .props()
        .onChange('aaa');
      expect(companyEditor.state().company.name).toEqual('aaa');
    });
  });

  it('should always render a `EditorSearchBox`', () => {
    expect(companyEditor.find('EditorSearchBox').length).toBe(1);
  });

  describe('the rendered `EditorSearchBox', () => {
    it('should accept props', () => {
      expect(
        companyEditor.find('EditorSearchBox').props().addressCallback
      ).not.toBe(undefined);
      expect(companyEditor.find('EditorSearchBox').props().placeholder).toEqual(
        'Company address'
      );
    });

    it('should update address state on addressCallback', () => {
      companyEditor
        .find('EditorSearchBox')
        .props()
        .addressCallback({
          address: { street: 'abc' }
        });
      expect(companyEditor.state().company.address).toEqual({ street: 'abc' });
    });
  });

  it('should always render a `EditorButtons', () => {
    expect(companyEditor.find('EditorButtons').length).toBe(1);
  });

  describe('the rendered `EditorButtons`', () => {
    it('should have isUpdate props', () => {
      expect(companyEditor.find('EditorButtons').props().isUpdate).toBe(false);
    });

    it('should call addCompany method on method onAdd', () => {
      companyEditor
        .find('EditorButtons')
        .props()
        .onAdd();

      expect(props.addCompany.mock.calls.length).toBe(1);
      expect(props.addCompany.mock.calls[0][0]).toBe(
        companyEditor.state().company
      );
    });

    it('should call endAddCompany method on method onCancelAdd', () => {
      companyEditor
        .find('EditorButtons')
        .props()
        .onCancelAdd();

      expect(props.endAddCompany.mock.calls.length).toBe(1);
    });

    it('should call updateCompany method on method onUpdate', () => {
      companyEditor
        .find('EditorButtons')
        .props()
        .onUpdate();

      expect(props.updateCompany.mock.calls.length).toBe(1);
      expect(props.updateCompany.mock.calls[0][0]).toBe(
        companyEditor.state().company
      );
    });

    it('should call endEditCompany method on method onCancelUpdate', () => {
      companyEditor
        .find('EditorButtons')
        .props()
        .onCancelUpdate();

      expect(props.endEditCompany.mock.calls.length).toBe(1);
    });
  });

  it('should always render a `ColorPicker`', () => {
    expect(companyEditor.find('ColorPicker').length).toBe(1);
  });

  describe('the rendered `ColorPicker`', () => {
    it('should update company color onColorChange', () => {
      companyEditor
        .find('ColorPicker')
        .props()
        .onColorChange('#abcdef');

      expect(companyEditor.state().company.color).toEqual('#abcdef');
    });
  });

  it('should always render a `InfoBox`', () => {
    expect(companyEditor.find('InfoBox').length).toBe(1);
  });

  /*
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
