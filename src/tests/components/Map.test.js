import React from 'react';
import { shallow } from 'enzyme';

import configureEnzyme from '../testUtil.test';
import Map from '../../components/Map';

configureEnzyme();

describe('Map', () => {
  let map;

  beforeEach(() => {
    map = shallow(<Map />);
  });

  it('should render a `MapComponent`', () => {
    expect(map.find('MapComponent').length).toBe(1);
  });
});
