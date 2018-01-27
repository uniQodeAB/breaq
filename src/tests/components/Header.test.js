import React from 'react';
import { shallow } from 'enzyme';
import { isLoaded } from 'react-redux-firebase';

import Header from '../../components/Header';

jest.mock('react-redux-firebase', () => ({
  isLoaded: jest.fn()
}));

isLoaded.mockReturnValueOnce(true);

describe('Header', () => {
  describe('when logged out', () => {
    let header;
    const props = {
      isLoggedOut: true,
      login: jest.fn(),
      logout: jest.fn()
    };

    beforeEach(() => {
      header = shallow(<Header {...props} />);
    });

    it('should render a button to login', () => {
      expect(header.find('button').length).toBe(1);
    });

    describe('when the button is clicked', () => {
      it('should call login method', () => {
        header.find('button').simulate('click');
        expect(props.login.mock.calls.length).toBe(1);
      });
    });
  });

  describe('when logged in', () => {
    let header;
    const props = {
      isLoggedOut: false,
      login: jest.fn(),
      logout: jest.fn(),
      photo: '/image.png'
    };

    beforeEach(() => {
      header = shallow(<Header {...props} />);
    });

    it('should render a button to logout', () => {
      expect(header.find('button').length).toBe(1);
    });

    describe('the rendered button', () => {
      it('should have a profile photo', () => {
        expect(
          header
            .find('button')
            .children()
            .find('img')
            .props().src
        ).toBe(props.photo);
      });

      describe('when the button is clicked', () => {
        it('should call logout method', () => {
          header.find('button').simulate('click');
          expect(props.logout.mock.calls.length).toBe(1);
        });
      });
    });
  });
});
