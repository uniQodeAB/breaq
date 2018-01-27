import React from 'react';
import { shallow } from 'enzyme';

import Button from '../../components/Button';

describe('Button', () => {
  let button;
  let mockOnClick;

  beforeEach(() => {
    mockOnClick = jest.fn();
    button = shallow(<Button onClick={mockOnClick}>text</Button>);
  });

  it('should render a `button`', () => {
    expect(button.find('button').length).toBe(1);
  });

  it('should call onClick prop on button click', () => {
    button.simulate('click');

    expect(mockOnClick.mock.calls.length).toBe(1);
  });

  it('shoudl render children as content', () => {
    expect(button.text()).toBe('text');
  });
});
