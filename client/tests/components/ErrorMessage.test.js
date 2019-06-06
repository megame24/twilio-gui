import React from 'react';
import { shallow } from "enzyme";
import { ErrorMessage } from '../../src/components/ErrorMessage';

describe('Testing ErrorMessage component', () => {
  describe('Testing component methods', () => {
    const props = {
      errors: {
        message: 'error!!',
        time: new Date()
      }
    }
    const ErrorMessageComp = () => shallow(<ErrorMessage { ...props } />);
    it('Should set _isMounted to true when the component is mounted', () => {
      const ErrorMessageCompInstance = ErrorMessageComp().instance();
      expect(ErrorMessageCompInstance._isMounted).toBeTruthy();
    });
    it('Should set _isMounted to false when the component is unmounted', () => {
      jest.spyOn(ErrorMessage.prototype, 'componentWillUnmount');
      ErrorMessageComp().unmount();
      expect(ErrorMessage.prototype.componentWillUnmount.mock.calls.length).toEqual(1);
      expect(ErrorMessage.prototype._isMounted).toBeFalsy();
    });
    it('Should set visible to false when handleDismiss is called', async () => {
      const ErrorMessageCompInstance = ErrorMessageComp().instance();
      ErrorMessageCompInstance.state.visible = true;
      ErrorMessageCompInstance.handleDismiss();
      expect(ErrorMessageCompInstance.state.visible).toBeFalsy();
    });
    it('Should set visible to false when dismissOnTimeout is called and _isMounted is true', async () => {
      const ErrorMessageCompInstance = ErrorMessageComp().instance();
      ErrorMessageCompInstance.state.visible = true;
      await ErrorMessageCompInstance.dismissOnTimeout();
      expect(ErrorMessageCompInstance.state.visible).toBeFalsy();
    });
    it('Should do nothing when dismissOnTimeout is called and _isMounted is false', async () => {
      const ErrorMessageCompInstance = ErrorMessageComp().instance();
      ErrorMessageCompInstance.state.visible = true;
      ErrorMessageCompInstance._isMounted = false;
      await ErrorMessageCompInstance.dismissOnTimeout();
      expect(ErrorMessageCompInstance.state.visible).toBeTruthy();
    });
    it('Should set visible to true when componentWillReceiveProps is called', () => {
      const ErrorMessageCompt = ErrorMessageComp();
      const dismissOnTimeout = jest.spyOn(ErrorMessageCompt.instance(), 'dismissOnTimeout');
      dismissOnTimeout.mockReset();
      const newErrors = {
        message: 'new errors',
        time: new Date
      };
      ErrorMessageCompt.setProps({ errors: newErrors });
      expect(dismissOnTimeout.mock.calls.length).toEqual(1);
      expect(ErrorMessageCompt.instance().state.visible).toBeTruthy();
    });
    it('Should render as expected when visible is true', () => {
      const tree = ErrorMessageComp();
      tree.setState({ visible: true });
      expect(tree).toMatchSnapshot();
    });
    it('Should render as expected when visible is false', () => {
      const tree = ErrorMessageComp();
      tree.setState({ visible: false });
      expect(tree).toMatchSnapshot();
    });
  });
});
