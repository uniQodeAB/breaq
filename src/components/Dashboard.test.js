import React from 'react';

import { isLoaded } from 'react-redux-firebase';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dashboard from './Dashboard';

jest.mock('react-redux-firebase', () => ({
  isLoaded: jest.fn()
}));

jest.mock('../containers/MapContainer', () => 'MapContainer');
jest.mock(
  '../containers/AddEditEmployeeContainer',
  () => 'AddEditEmployeeContainer'
);
jest.mock('../containers/EmployeeGridContainer', () => 'EmployeeGridContainer');
jest.mock(
  '../containers/BaseAddressBoxContainer',
  () => 'BaseAddressBoxContainer'
);

isLoaded.mockReturnValueOnce(false).mockReturnValue(true);

describe('Dashboard', () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  describe('when not yet loaded', () => {
    it('should indicate that it is loading', () => {
      const dashboard = shallow(<Dashboard />);
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

    beforeEach(() => {
      dashboard = shallow(<Dashboard />);
    });

    it('should always render a `MapContainer`', () => {
      expect(dashboard.find('MapContainer').length).toBe(1);
    });

    it('should not provide `MapContainer` with props', () => {
      const mapContainer = dashboard.find('MapContainer').first();
      expect(mapContainer.props()).toEqual({});
    });

    it('should always render a `BaseAddressBoxContainer`', () => {
      expect(dashboard.find('BaseAddressBoxContainer').length).toBe(1);
    });

    it('should not provide `BaseAddressBoxContainer` with props', () => {
      const mapContainer = dashboard.find('BaseAddressBoxContainer').first();
      expect(mapContainer.props()).toEqual({});
    });

    it('should always render a `AddEditEmployeeContainer`', () => {
      expect(dashboard.find('AddEditEmployeeContainer').length).toBe(1);
    });

    it('should not provide `AddEditEmployeeContainer` with props', () => {
      const mapContainer = dashboard.find('AddEditEmployeeContainer').first();
      expect(mapContainer.props()).toEqual({});
    });

    it('should always render a EmployeeGridContainer', () => {
      expect(dashboard.find('EmployeeGridContainer').length).toBe(1);
    });

    it('should not provide `EmployeeGridContainer` with props', () => {
      const mapContainer = dashboard.find('EmployeeGridContainer').first();
      expect(mapContainer.props()).toEqual({});
    });
  });
});
