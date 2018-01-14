import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddressBox from './AddressBox';

describe('AddressBox', () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  it('should not render if prop location is empty', () => {
    const addressBox = shallow(<AddressBox location={undefined} id={'id'} />);
    expect(addressBox.children().length).toBe(0);
  });

  describe('when location exists', () => {
    let props;
    let addressBox;

    beforeEach(() => {
      props = {
        id: '',
        location: {
          name: 'name',
          project: 'project',
          address: {
            street_number: {
              longName: 'street_number'
            },
            route: {
              longName: 'route'
            },
            postal_code: {
              longName: 'postal_code'
            },
            postal_town: {
              longName: 'postal_town'
            },
            administrative_area_level_1: {
              longName: 'administrative_area_level_1'
            },
            country: {
              longName: 'country'
            }
          }
        }
      };

      addressBox = shallow(<AddressBox {...props} />);
    });

    it('should render address content', () => {
      expect(addressBox.find('div.content div.container').length).toBe(1);
    });

    describe('when no icon provided', () => {
      it('should render the home icon', () => {
        expect(addressBox.find('div.icon i.fa-home').length).toBe(1);
      });
    });

    describe('when icon provided', () => {
      it('should render the user icon if `USER`', () => {
        const newProps = {
          ...props,
          icon: 'USER'
        };

        expect(
          shallow(<AddressBox {...newProps} />).find('div.icon i.fas.fa-user')
            .length
        ).toBe(1);
      });

      it('should render the home icon if `BASE`', () => {
        const newProps = {
          ...props,
          icon: 'BASE'
        };

        expect(
          shallow(<AddressBox {...newProps} />).find('div.icon i.fas.fa-home')
            .length
        ).toBe(1);
      });

      it('should render the home icon if unknown', () => {
        const newProps = {
          ...props,
          icon: 'COMPLETELY_UNKNOWN'
        };

        expect(
          shallow(<AddressBox {...newProps} />).find('div.icon i.fas.fa-home')
            .length
        ).toBe(1);
      });
    });

    describe('the rendered address content', () => {
      let addressContent;

      beforeEach(() => {
        addressContent = addressBox.find('div.content div.container').first();
      });

      it('should render a h1', () => {
        expect(addressContent.find('h1').length).toBe(1);
      });

      describe('the rendered h1', () => {
        it('should be the name', () => {
          expect(
            addressContent
              .find('h1')
              .first()
              .text()
          ).toBe(props.location.name);
        });
      });

      it('should render a h2', () => {
        expect(addressContent.find('h2').length).toBe(1);
      });

      describe('the rendered h2', () => {
        it('should be the project', () => {
          expect(
            addressContent
              .find('h2')
              .first()
              .text()
          ).toBe(props.location.project);
        });
      });

      it('should render several paragraphs', () => {
        expect(addressContent.find('p').length).toBeGreaterThan(0);
      });

      describe('the rendered paragraph', () => {
        let paragraphs;

        beforeEach(() => {
          paragraphs = addressContent.find('p');
        });

        it('should contain the street number and route', () => {
          expect(paragraphs.get(0)).toEqual(
            <p>
              {props.location.address.street_number.longName}{' '}
              {props.location.address.route.longName}
            </p>
          );
        });

        it('should contain the post code and postal town', () => {
          expect(paragraphs.get(1)).toEqual(
            <p>
              {props.location.address.postal_code.longName}{' '}
              {props.location.address.postal_town.longName}
            </p>
          );
        });

        it('should contain the administrative area (muncipality, prefecture, district...)', () => {
          expect(paragraphs.get(2)).toEqual(
            <p>{props.location.address.administrative_area_level_1.longName}</p>
          );
        });

        it('should contain the country', () => {
          expect(paragraphs.get(3)).toEqual(
            <p>{props.location.address.country.longName}</p>
          );
        });
      });
    });
  });
});
