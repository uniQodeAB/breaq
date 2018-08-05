import * as enzyme from 'enzyme';
import * as React from 'react';
import Autocomplete, { IProps } from "./Autocomplete";

describe('Autocomplete', () => {
  let props:IProps;
  let autocomplete:enzyme.ShallowWrapper<{}, {}, Autocomplete>;

  beforeEach(() => {
    props = {
      loading: false,
      onChange: jest.fn(),
      onSelect: jest.fn(),
      placeholder: 'test placeholder',
      suggestions: [{
        id: '1',
        name: 'test 1'
      }, {
        id: '2',
        name: 'test 2'
      }, {
        id: '3',
        name: 'test 3'
      }],
      value: 'test',
    };

    autocomplete = enzyme.shallow(<Autocomplete { ...props }/>);
  });

  it('should call onSelect with the selected value if an autocomplete suggestion is selected', () => {
    const renderedProps:any = autocomplete.props();
    renderedProps.onSuggestionSelected(1);
    expect(props.onSelect).toHaveBeenCalledWith(1);
  });
});
