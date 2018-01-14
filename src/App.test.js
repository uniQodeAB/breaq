import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderContainer from './containers/HeaderContainer';
import Footer from './components/Footer';
import App from './App';

describe('App', () => {
  let app;

  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
    app = shallow(<App />);
  });

  it('should always render a div', () => {
    const divs = app.find('div');

    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    it('contains everyting else that gets rendered', () => {
      const divs = app.find('div');

      const wrappingDiv = divs.first();

      expect(wrappingDiv.children()).toEqual(shallow(<App />).children());
    });

    it('always renders a `HeaderContainer`', () => {
      expect(app.contains(<HeaderContainer />)).toBe(true);
    });

    it('always renders a `Footer`', () => {
      expect(app.contains(<Footer />)).toBe(true);
    });
  });
});
