import React from 'react';
import { shallow } from "enzyme";
import { OldContactMsg, mapStateToProps } from '../../src/views/OldContactMsg';

describe('Testing OldContactMsg component', () => {
  describe("Testing mapStateToProps", () => {
    it("should map the state to the props correctly", () => {
      const state = {
        activeContact: {
          activeContact: {
            id: 1, phoneNumber: 'num'
          },
          isLoading: false,
          errors: {}
        },
        contactMessages: {
          messages: {},
          isLoading: false,
          errors: {}
        },
        sentMessage: {
          success: false,
          isLoading: false,
          errors: {}
        },
        auth: { token: 'token' }
      };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual({
        activeContact: {
          id: 1, phoneNumber: 'num',
        },
        activeContactIsLoading: false,
        messages: {},
        contactMsgsIsLoading: false,
        sentMsgIsLoading: false,
        success: false,
        token: 'token',
        activeContactErrors: {},
        contactMsgErrors: {},
        sentMsgErrors: {},
      });
    });
  });
  describe('Testing component methods', () => {
    const getContactSpy = jest.fn();
    const getContactMessagesSpy = jest.fn();
    const getContactsSpy = jest.fn();
    const messageOldContactSpy = jest.fn();
    const resetSuccessSpy = jest.fn();
    const clearActiveContactSpy = jest.fn();
    const scrollToBottomSpy = jest.fn();
    const props = {
      match: {
        params: {
          id: 'id'
        }
      },
      getContact: getContactSpy,
      getContactMessages: getContactMessagesSpy,
      getContacts: getContactsSpy,
      messageOldContact: messageOldContactSpy,
      resetSuccess: resetSuccessSpy,
      clearActiveContact: clearActiveContactSpy,
      activeContact: {
        id: 1, phoneNumber: 'num',
      },
      activeContactIsLoading: false,
      messages: {
        1: {
          id: 'id',
          from: {
            id: 'fromId'
          },
          media: 'media'
        }
      },
      contactMsgsIsLoading: false,
      sentMsgIsLoading: false,
      success: false,
      token: 'token',
      activeContactErrors: {},
      contactMsgErrors: {},
      sentMsgErrors: {},
      errors: {}
    }
    OldContactMsg.prototype.scrollToBottom = scrollToBottomSpy;
    const OldContactMsgComp = () => shallow(<OldContactMsg {...props} />);
    it('Should call getContact and getContactMessages when the component is mounted', () => {
      OldContactMsgComp();
      expect(getContactSpy).toBeCalledTimes(1);
      expect(getContactMessagesSpy).toBeCalledTimes(1);
    });
    it('Should call getContact and getContactMessages when componentWillReceiveProps is called and the ids don\'t match', () => {
      const OldContactMsgWrapper = OldContactMsgComp();
      OldContactMsgWrapper.setProps({
        match: {
          params: {
            id: 'id2'
          }
        }
      });
      expect(getContactSpy).toBeCalledWith('id2');
      expect(getContactMessagesSpy).toBeCalledWith('id2');
    });
    it('Should call resetSuccess and getContactMessages when componentWillReceiveProps is called and props.success has changed', () => {
      const OldContactMsgWrapper = OldContactMsgComp();
      OldContactMsgWrapper.setProps({ success: true });
      expect(getContactMessagesSpy).toBeCalledWith('id2');
      expect(resetSuccessSpy).toBeCalledTimes(1);
    });
    // it('Should call scrollToBottom when the component updates', () => {
    //   const OldContactMsgWrapper = OldContactMsgComp();
    //   OldContactMsgWrapper.setProps({ success: true });
    //   expect(scrollToBottomSpy).toBeCalled();
    // });
    it('Should call clearActiveContact when the component is unmounted', () => {
      OldContactMsgComp().unmount();
      expect(clearActiveContactSpy).toBeCalledTimes(1);
    });
    it('Should update state when handleChange is called', () => {
      const event = {
        persist: jest.fn(),
        target: {
          name: 'message',
          value: 'newMsg'
        }
      };
      const OldContactMsgCompInstance = OldContactMsgComp().instance();
      OldContactMsgCompInstance.handleChange(event);
      expect(OldContactMsgCompInstance.state.formData.message).toBe('newMsg');
    });
    it('Should call messageOldContact when handleKeyPress is called with event.key eql to "Enter" and shiftKey eql to false', () => {
      const event = {
        key: 'Enter',
        shiftKey: false
      };
      const OldContactMsgCompInstance = OldContactMsgComp().instance();
      OldContactMsgCompInstance.handleKeyPress(event);
      expect(messageOldContactSpy).toBeCalledTimes(1);
    });
    it('Should not call messageOldContact when handleKeyPress is called with event.key not eql to "Enter" and shiftKey not eql to false', () => {
      const event = {
        key: 'A',
        shiftKey: true
      };
      const OldContactMsgCompInstance = OldContactMsgComp().instance();
      OldContactMsgCompInstance.handleKeyPress(event);
      expect(messageOldContactSpy).toBeCalledTimes(1);
    });
  });
});
