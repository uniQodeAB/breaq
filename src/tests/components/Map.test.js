import React from 'react';
import { shallow } from 'enzyme';

import Map from '../../components/Map';

describe('Map', () => {
  let map;

  beforeEach(() => {
    map = shallow(<Map />);
  });

  it('should render a `MapComponent`', () => {
    expect(map.find('MapComponent').length).toBe(1);
  });
});
