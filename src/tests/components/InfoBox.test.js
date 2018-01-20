import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfoBox, { icons } from '../../components/InfoBox';

describe('InfoBox', () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  describe('always render an icon', () => {
    describe('when no explicit icon supplied', () => {
      it('should have a default icon', () => {
        const infoBox = shallow(<InfoBox />);
        expect(infoBox.find('.icon i').get(0)).toEqual(
          <i aria-hidden="true" className="fas fa-user" />
        );
      });
    });

    describe('when the type is a company', () => {
      it('should render the home icon', () => {
        const infoBox = shallow(<InfoBox icon={icons.company} />);
        expect(infoBox.find('.icon i').get(0)).toEqual(
          <i aria-hidden="true" className="fas fa-home" />
        );
      });
    });

    describe('when the type is an employee', () => {
      it('should render the user icon', () => {
        const infoBox = shallow(<InfoBox icon={icons.employee} />);
        expect(infoBox.find('.icon i').get(0)).toEqual(
          <i aria-hidden="true" className="fas fa-user" />
        );
      });
    });
  });

  describe('when rendering controls', () => {
    describe('when onEdit and onDelete is missing', () => {
      it('should not render an edit or delete button', () => {
        const infoBox = shallow(<InfoBox />);
        expect(infoBox.find('.controls button').length).toBe(0);
      });
    });

    describe('when onEdit exists', () => {
      let mockCallback;
      let infoBox;

      beforeEach(() => {
        mockCallback = jest.fn();
        infoBox = shallow(<InfoBox onEdit={mockCallback} />);
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
        infoBox = shallow(<InfoBox onDelete={mockCallback} />);
      });

      it('should render a delete button', () => {
        expect(infoBox.find('.controls button').get(0)).toEqual(
          <button onClick={mockCallback}>
            <i className={'fas fa-trash-alt'} />
          </button>
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

    describe('when both onEdit and onDelete exists', () => {
      it('should render both edit and delete buttons', () => {
        const infoBox = shallow(
          <InfoBox onEdit={jest.fn()} onDelete={jest.fn()} />
        );
        expect(infoBox.find('.controls button').length).toBe(2);
      });
    });
  });

  describe('when rendering content', () => {
    it('should render a title as h1', () => {
      const infoBox = shallow(<InfoBox title={'Test title'} />);
      expect(infoBox.find('.content h1').text()).toBe('Test title');
    });

    it('should render a subtitle as h2', () => {
      const infoBox = shallow(<InfoBox subTitle={'Test subtitle'} />);
      expect(infoBox.find('.content h2').text()).toBe('Test subtitle');
    });

    it('should render an address', () => {
      const infoBox = shallow(
        <InfoBox
          address={{
            streetAddress: 'street address',
            postalAddress: 'postal address',
            prefecture: 'prefecture',
            country: 'country'
          }}
        />
      );
      expect(infoBox.find('.content p').get(0)).toEqual(<p>street address</p>);
      expect(infoBox.find('.content p').get(1)).toEqual(<p>postal address</p>);
      expect(infoBox.find('.content p').get(2)).toEqual(<p>prefecture</p>);
      expect(infoBox.find('.content p').get(3)).toEqual(<p>country</p>);
    });
  });
});
