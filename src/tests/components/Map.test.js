import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Map from '../../components/Map';

describe('Map', () => {
  let map;

  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });

    map = shallow(<Map />);
  });

  it('should render a `MapComponent`', () => {
    expect(map.find('MapComponent').length).toBe(1);
  });
});
