import React from 'react';

import { shallow } from 'enzyme';
import CompanyEditor from '../../components/CompanyEditor';

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
      company: { color: '#123455' }
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
});
