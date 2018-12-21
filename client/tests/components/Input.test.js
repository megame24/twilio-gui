import React from 'react';
import { shallow } from "enzyme";
import Input from '../../src/components/Input';

describe('Testing Input component', () => {
  it('Should render as expected', () => {
    const tree = shallow(<Input />);
    expect(tree).toMatchSnapshot();
  });
});
