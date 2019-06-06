import React from 'react';
import { shallow } from "enzyme";
import Loading from '../../src/components/Loading';

describe('Testing Loading component', () => {
  it('Should render as expected', () => {
    const props = {
      isLoading: true
    }
    const tree = shallow(<Loading { ...props } />);
    expect(tree).toMatchSnapshot();
  });
});
