import React from 'react';

import { shallow } from 'enzyme';
import InfoBox, {
  icons,
  CompanyInfoBox,
  EmployeeInfoBox
} from '../../components/InfoBox';

describe('InfoBox', () => {
  const props = {
    color: '#abcdef'
  };

  describe('always render an icon', () => {
    describe('when no explicit icon supplied', () => {
      it('should have a default icon', () => {
        const infoBox = shallow(<InfoBox {...props} />);
        expect(infoBox.find('.icon i').props().className).toEqual(
          'fas fa-user'
        );
      });
    });

    describe('when the type is a company', () => {
      it('should render the home icon', () => {
        const infoBox = shallow(<InfoBox {...props} icon={icons.company} />);
        expect(infoBox.find('.icon i').props().className).toEqual(
          'fas fa-home'
        );
      });
    });

    describe('when the type is an employee', () => {
      it('should render the user icon', () => {
        const infoBox = shallow(<InfoBox {...props} icon={icons.employee} />);
        expect(infoBox.find('.icon i').props().className).toEqual(
          'fas fa-user'
        );
      });
    });
  });

  describe('when rendering controls', () => {
    describe('when onEdit, onDelete and onAdd is missing', () => {
      it('should not render an edit or delete button', () => {
        const infoBox = shallow(<InfoBox {...props} />);
        expect(infoBox.find('.controls button').length).toBe(0);
      });
    });

    describe('when onEdit exists', () => {
      let mockCallback;
      let infoBox;

      beforeEach(() => {
        mockCallback = jest.fn();
        infoBox = shallow(<InfoBox {...props} onEdit={mockCallback} />);
      });

      it('should render an edit button', () => {
        expect(infoBox.find('.controls button').get(0)).toEqual(
          <button onClick={mockCallback}>
            <i className={'fas fa-edit'} />
          </button>
        );
      });

      it('should call onEdit function on edit button click', () => {
        infoBox
          .find('.controls button')
          .first()
          .simulate('click');
        expect(mockCallback.mock.calls.length).toEqual(1);
      });
    });

    describe('when onDelete exists', () => {
      let mockCallback;
      let infoBox;

      beforeEach(() => {
        mockCallback = jest.fn();
        infoBox = shallow(<InfoBox {...props} onDelete={mockCallback} />);
      });

      it('should render a delete button', () => {
        expect(infoBox.find('.controls button').props().className).toEqual(
          'button-delete'
        );
      });

      it('should call onDelete function on delete button click', () => {
        infoBox
          .find('.controls button')
          .first()
          .simulate('click');
        expect(mockCallback.mock.calls.length).toEqual(1);
      });
    });

    describe('when onAdd exists', () => {
      let mockCallback;
      let infoBox;

      beforeEach(() => {
        mockCallback = jest.fn();
        infoBox = shallow(<InfoBox {...props} onAdd={mockCallback} />);
      });

      it('should render an add employee button', () => {
        expect(infoBox.find('.controls button').props().className).toEqual(
          'button-employee'
        );
      });

      it('should call onAdd function on add employee button click', () => {
        infoBox
          .find('.controls button')
          .first()
          .simulate('click');
        expect(mockCallback.mock.calls.length).toEqual(1);
      });
    });

    describe('when both onEdit, onDelete and onAdd exists', () => {
      it('should render both edit and delete buttons', () => {
        const infoBox = shallow(
          <InfoBox
            {...props}
            onEdit={jest.fn()}
            onDelete={jest.fn()}
            onAdd={jest.fn()}
          />
        );
        expect(infoBox.find('.controls button').length).toBe(3);
      });
    });
  });

  describe('when rendering content', () => {
    it('should render a title as h1', () => {
      const infoBox = shallow(<InfoBox {...props} title={'Test title'} />);
      expect(infoBox.find('.info-content h1').text()).toBe('Test title');
    });

    it('should render a subtitle as h2', () => {
      const infoBox = shallow(
        <InfoBox {...props} subTitle={'Test subtitle'} />
      );
      expect(infoBox.find('.info-content h2').text()).toBe('Test subtitle');
    });

    it('should render an address', () => {
      const infoBox = shallow(
        <InfoBox
          {...props}
          address={{
            streetAddress: 'street address',
            postalAddress: 'postal address',
            prefecture: 'prefecture',
            country: 'country'
          }}
        />
      );
      expect(infoBox.find('.info-content p').get(0)).toEqual(
        <p>street address</p>
      );
      expect(infoBox.find('.info-content p').get(1)).toEqual(
        <p>postal address</p>
      );
      expect(infoBox.find('.info-content p').get(2)).toEqual(<p>prefecture</p>);
      expect(infoBox.find('.info-content p').get(3)).toEqual(<p>country</p>);
    });
  });
});

describe('CompanyInfoBox', () => {
  let companyInfoBox;
  const props = {
    companyId: '123',
    initEditCompany: jest.fn(),
    addEmployee: jest.fn(),
    deleteCompany: jest.fn(),
    color: '#12345'
  };

  beforeEach(() => {
    companyInfoBox = shallow(<CompanyInfoBox {...props} />);
  });

  it('should always render an `InfoBox`', () => {
    expect(companyInfoBox.find('InfoBox').length).toBe(1);
  });

  describe('the rendered inifobox', () => {
    it('should be passed props', () => {
      expect(companyInfoBox.find('InfoBox').props().color).toEqual('#12345');
    });

    it('should call callbacks onEdit, onDelete, onAdd', () => {
      companyInfoBox
        .find('InfoBox')
        .props()
        .onAdd();
      expect(props.addEmployee.mock.calls.length).toBe(1);

      companyInfoBox
        .find('InfoBox')
        .props()
        .onEdit();
      expect(props.initEditCompany.mock.calls.length).toBe(1);

      companyInfoBox
        .find('InfoBox')
        .props()
        .onDelete();
      expect(props.deleteCompany.mock.calls.length).toBe(1);
    });
  });
});

describe('EmployeeInfoBox', () => {
  let employeeInfoBox;
  const props = {
    companyId: '123',
    employeeId: '456',
    initEditEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
    color: '#12345'
  };

  beforeEach(() => {
    employeeInfoBox = shallow(<EmployeeInfoBox {...props} />);
  });

  it('should always render an `InfoBox`', () => {
    expect(employeeInfoBox.find('InfoBox').length).toBe(1);
  });

  describe('the rendered inifobox', () => {
    it('should be passed props', () => {
      expect(employeeInfoBox.find('InfoBox').props().color).toEqual('#12345');
    });

    it('should call callbacks onEdit, onDelete, onAdd', () => {
      employeeInfoBox
        .find('InfoBox')
        .props()
        .onEdit();
      expect(props.initEditEmployee.mock.calls.length).toBe(1);

      employeeInfoBox
        .find('InfoBox')
        .props()
        .onDelete();
      expect(props.deleteEmployee.mock.calls.length).toBe(1);
    });
  });
});
