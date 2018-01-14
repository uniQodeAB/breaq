import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { isLoaded } from 'react-redux-firebase';
import Map from './Map';

jest.mock('react-redux-firebase', () => ({
  isLoaded: jest.fn(),
  isEmpty: jest.fn()
}));

isLoaded.mockReturnValueOnce(false).mockReturnValue(true);

describe('Map', () => {
  let map;

  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });

    map = shallow(<Map />);
  });

  it('should render a `MapComponent` when loaded', () => {
    expect(map.find('MapComponent').length).toBe(1);
  });
});
