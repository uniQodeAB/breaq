import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import Header from '../../components/Header';

jest.mock('react-redux-firebase', () => ({
  isLoaded: jest.fn(),
  isEmpty: jest.fn()
}));

isLoaded.mockReturnValueOnce(true);

describe('Header', () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  describe('when not loaded', () => {
    it('renders a loading indicator', () => {
      const header = shallow(
        <Header
          firebase={{
            profile: jest.fn(),
            login: jest.fn(),
            logout: jest.fn()
          }}
        />
      );

      expect(header.find('span').length).toBeGreaterThan(0);
      expect(
        header
          .find('span')
          .first()
          .text()
      ).toBe('Loading...');
    });
  });

  describe('when loaded', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        isEmpty.mockReturnValueOnce(true);
      });

      it('should render a login button if not logged in', () => {
        const header = shallow(
          <Header
            firebase={{
              profile: jest.fn(),
              login: jest.fn(),
              logout: jest.fn()
            }}
          />
        );

        expect(header.find('button').length).toBe(1);

        const button = header.find('button');
        expect(button.text()).toBe('Log In');
      });

      it('should call firebase login when clicking login button', () => {
        const loginMock = jest.fn();

        const header = shallow(
          <Header
            firebase={{
              profile: jest.fn(),
              login: loginMock,
              logout: jest.fn()
            }}
          />
        );

        header
          .find('button')
          .first()
          .simulate('click');
        expect(loginMock.mock.calls.length).toEqual(1);
      });
    });

    describe('when logged in', () => {
      it('should render a logout button if logged in', () => {
        const header = shallow(
          <Header
            firebase={{
              profile: jest.fn(),
              login: jest.fn(),
              logout: jest.fn()
            }}
            auth={{}}
          />
        );

        expect(header.find('button').length).toBe(1);

        const button = header.find('button');
        expect(button.find('img').length).toBe(1);
      });
    });

    it('should call firebase logout on button click', () => {
      const logoutMock = jest.fn();
      const header = shallow(
        <Header
          firebase={{
            profile: jest.fn(),
            login: jest.fn(),
            logout: logoutMock
          }}
          auth={{}}
        />
      );
      header
        .find('button')
        .first()
        .simulate('click');
      expect(logoutMock.mock.calls.length).toEqual(1);
    });
  });
});
