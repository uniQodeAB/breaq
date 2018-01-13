import React from 'react';
import Footer from './Footer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('App', () => {
  let footer;

  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
    footer = shallow(<Footer />);
  });

  it('should always render a footer', () => {
    const divs = footer.find('footer');

    expect(divs.length).toBeGreaterThan(0);
  });
});
