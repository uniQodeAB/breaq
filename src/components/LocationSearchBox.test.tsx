import * as enzyme from 'enzyme';
import * as React from 'react';
import LocationSearchBox, { IProps } from './LocationSearchBox';

describe('LocationSearchBox', () => {
  let props:IProps;
  let locationSearchBox:enzyme.ShallowWrapper;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      placeholder: 'test placeholder',
    };

    locationSearchBox = enzyme.shallow(<LocationSearchBox { ...props }/>);
  });

  it('should call onChange', () => {
    // tslint:disable-next-line:no-console
    const renderedProps:any = locationSearchBox.props();
    renderedProps.onChange('okokok');

    expect(props.onChange).toHaveBeenCalledWith('okokok');
  });
});
