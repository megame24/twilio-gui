import React from 'react';
import { shallow } from "enzyme";
import { NewContactMsg, mapStateToProps } from '../../src/views/NewContactMsg';

describe('Testing NewContactMsg component', () => {
  describe("Testing mapStateToProps", () => {
    it("should map the state to the props correctly", () => {
      const state = {
        sentMessage: {
          success: false,
          isLoading: false,
          sentTo: {
            id: 'id'
          },
          errors: {}
        }
      };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual(state.sentMessage);
    });
  });
  describe('Testing component methods', () => {
    const messageNewContactSpy = jest.fn();
    const resetSuccessSpy = jest.fn();
    const props = {
      messageNewContact: messageNewContactSpy,
      resetSuccess: resetSuccessSpy,
      success: false,
      isLoading: false,
      sentTo: {
        id: 'id'
      },
      errors: {}
    }
    const NewContactMsgComp = () => shallow(<NewContactMsg { ...props } />);
    it('Should not call resetSuccess when the component is unmounted and props.success is false', () => {
      NewContactMsgComp().unmount();
      expect(resetSuccessSpy).toBeCalledTimes(0);
    });
    it('Should call resetSuccess when the component is unmounted and props.success is true', () => {
      props.success = true;
      const NewContactMsgComp = () => shallow(<NewContactMsg { ...props } />);
      NewContactMsgComp().unmount();
      expect(resetSuccessSpy).toBeCalledTimes(1);
    });
    it('Should update state when handleChange is called', () => {
      const event = {
        persist: jest.fn(),
        target: {
          name: 'phoneNumber',
          value: 'newNumber'
        }
      };
      const NewContactMsgCompInstance = NewContactMsgComp().instance();
      NewContactMsgCompInstance.handleChange(event);
      expect(NewContactMsgCompInstance.state.formData.phoneNumber).toBe('newNumber');
    });
    it('Should call messageNewContact when handleKeyPress is called with event.key eql to "Enter" and shiftKey eql to false', () => {
      const event = {
        key: 'Enter',
        shiftKey: false
      };
      const NewContactMsgCompInstance = NewContactMsgComp().instance();
      NewContactMsgCompInstance.handleKeyPress(event);
      expect(messageNewContactSpy).toBeCalledTimes(1);
    });
    it('Should not call messageNewContact when handleKeyPress is called with event.key not eql to "Enter" and shiftKey not eql to false', () => {
      const event = {
        key: 'A',
        shiftKey: true
      };
      const NewContactMsgCompInstance = NewContactMsgComp().instance();
      NewContactMsgCompInstance.handleKeyPress(event);
      expect(messageNewContactSpy).toBeCalledTimes(1);
    });
  });
});
