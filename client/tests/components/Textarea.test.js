import React from 'react';
import { shallow } from "enzyme";
import Textarea from '../../src/components/Textarea';

describe('Testing Textarea component', () => {
  it('Should render as expected', () => {
    const tree = shallow(<Textarea />);
    expect(tree).toMatchSnapshot();
  });
});
