import React from 'react';
import { shallow } from "enzyme";
import { Auth, mapStateToProps } from '../../src/views/Auth';

describe('Testing Auth component', () => {
  describe("Testing mapStateToProps", () => {
    it("should map the state to the props correctly", () => {
      const state = {
        phoneNumber: {
          availableNums: [],
        },
        auth: {
          isLoading: false,
          errors: {}
        }
      };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual({
        availableNums: [], errors: {}, isLoading: false
      });
    });
  });
  describe('Testing component methods', () => {
    const getAvailableNumsSpy = jest.fn();
    const loginSpy = jest.fn();
    const props = {
      getAvailableNums: getAvailableNumsSpy,
      login: loginSpy,
      availableNums: [],
      errors: {},
      isLoading: false
    }
    const AuthComp = () => shallow(<Auth { ...props } />);
    it('Should call getAvailableNums when the component is mounted', () => {
      AuthComp();
      expect(getAvailableNumsSpy).toHaveBeenCalledTimes(1);
    });
    it('Should call getContacts when componentWillReceiveProps is called and the token has changed', () => {
      const AuthCompt = AuthComp();
      AuthCompt.setProps({ availableNums: ['firstNum', 'secondNum'] });
      expect(AuthCompt.instance().state.formData.phoneNumber).toBe('firstNum');
    });
    it('Should update state when handleChange is called', () => {
      const event = {
        persist: jest.fn(),
        target: {
          name: 'phoneNumber',
          value: 'newNumber'
        }
      };
      const AuthCompInstance = AuthComp().instance();
      AuthCompInstance.handleChange(event);
      expect(AuthCompInstance.state.formData.phoneNumber).toBe('newNumber');
    });
    it('Should call login when handleSubmit is called', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const AuthCompInstance = AuthComp().instance();
      AuthCompInstance.handleSubmit(event);
      expect(loginSpy).toBeCalledTimes(1);
    });
  });
});
