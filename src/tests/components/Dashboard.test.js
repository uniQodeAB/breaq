import React from 'react';

import { isLoaded } from 'react-redux-firebase';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dashboard from '../../components/Dashboard';

jest.mock('react-redux-firebase', () => ({
  isLoaded: jest.fn()
}));

jest.mock('../../containers/MapContainer', () => 'MapContainer');
jest.mock(
  '../../containers/EmployeeInfoBoxContainer',
  () => 'EmployeeInfoBoxContainer'
);
jest.mock(
  '../../containers/CompanyInfoBoxContainer',
  () => 'CompanyInfoBoxContainer'
);
jest.mock(
  '../../containers/EmployeeCreatorContainer',
  () => 'EmployeeCreatorContainer'
);
jest.mock(
  '../../containers/CompanyListContainer',
  () => 'CompanyListContainer'
);
jest.mock(
  '../../containers/CompanyCreatorContainer',
  () => 'CompanyCreatorContainer'
);

isLoaded.mockReturnValueOnce(false).mockReturnValue(true);

describe('Dashboard', () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  describe('when not yet loaded', () => {
    it('should indicate that it is loading', () => {
      const dashboard = shallow(<Dashboard initAddCompany={jest.fn()} />);
      expect(
        dashboard
          .find('div.Dashboard')
          .first()
          .text()
      ).toBe('Loading...');
    });
  });

  describe('when loaded', () => {
    let dashboard;
    let props;

    beforeEach(() => {
      props = {
        initAddCompany: jest.fn()
      };
      dashboard = shallow(<Dashboard {...props} />);
    });

    afterEach(() => {
      props = {};
    });

    it('should always render a `MapContainer`', () => {
      expect(dashboard.find('MapContainer').length).toBe(1);
    });

    it('should not provide `MapContainer` with props', () => {
      const mapContainer = dashboard.find('MapContainer').first();
      expect(mapContainer.props()).toEqual({});
    });

    it('should always render a `CompanyListContainer`', () => {
      expect(dashboard.find('CompanyListContainer').length).toBe(1);
    });

    describe('when addCompany is false', () => {
      const mockCallback = jest.fn();
      beforeEach(() => {
        dashboard = shallow(<Dashboard initAddCompany={mockCallback} />);
      });

      it('should render a `Button` to add a new company', () => {
        expect(dashboard.find('Button').length).toBe(1);
      });

      describe('the rendered `Button`', () => {
        it('should call `initAddCompany`', () => {
          const button = dashboard.find('Button').first();
          button.simulate('click');
          expect(mockCallback.mock.calls.length).toEqual(1);
        });
      });
    });

    describe('when addCompany is true', () => {
      beforeEach(() => {
        dashboard = shallow(
          <Dashboard addCompany initAddCompany={jest.fn()} />
        );
      });
      it('should render a `CompanyCreator`', () => {
        expect(dashboard.find('CompanyCreatorContainer').length).toBe(1);
      });
    });
  });
});
