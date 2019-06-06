import React from 'react';
import { shallow } from "enzyme";
import { UpdateContact, mapStateToProps } from '../../src/views/UpdateContact';

describe('Testing UpdateContact component', () => {
  describe("Testing mapStateToProps", () => {
    it("should map the state to the props correctly", () => {
      const state = {
        activeContact: { contactToBeUpdated: {}, errors: {} },
        contactUpdate: { success: false, isLoading: false, errors: {} }
      };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual({
        success: false,
        isLoading: false,
        contactToBeUpdated: {},
        contactToBeUpdatedErrs: {},
        contactUpdateErrs: {}
      });
    });
  });
  describe('Testing component methods', () => {
    const getContactNotActiveSpy = jest.fn();
    const updateContactSpy = jest.fn();
    const resetSuccessSpy = jest.fn();
    const props = {
      match: {
        params: {
          id: 'id'
        }
      },
      getContactToBeUpdated: getContactNotActiveSpy,
      updateContact: updateContactSpy,
      resetSuccess: resetSuccessSpy,
      success: false,
      isLoading: false,
      contactToBeUpdated: {},
      contactToBeUpdatedErrs: {},
      contactUpdateErrs: {}
    }
    const UpdateContactComp = () => shallow(<UpdateContact { ...props } />);
    it('Should call getAvailableNums when the component is mounted', () => {
      UpdateContactComp();
      expect(getContactNotActiveSpy).toBeCalledWith('id');
    });
    it('Should update the state when componentWillReceiveProps is called and the contact has changed', () => {
      const UpdateContactCompt = UpdateContactComp();
      UpdateContactCompt.setProps({ contactToBeUpdated: {
        name: 'name', phoneNumber: '12345'
      } });
      expect(UpdateContactCompt.instance().state.formData.phoneNumber).toBe('12345');
    });
    it('Should update state when handleChange is called', () => {
      const event = {
        persist: jest.fn(),
        target: {
          name: 'phoneNumber',
          value: 'newNumber'
        }
      };
      const UpdateContactCompInstance = UpdateContactComp().instance();
      UpdateContactCompInstance.handleChange(event);
      expect(UpdateContactCompInstance.state.formData.phoneNumber).toBe('newNumber');
    });
    it('Should call login when handleSubmit is called', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const UpdateContactCompInstance = UpdateContactComp().instance();
      UpdateContactCompInstance.handleSubmit(event);
      expect(updateContactSpy).toBeCalledTimes(1);
    });
    it('Should not call resetSuccess when the component is unmounted and props.success is false', () => {
      UpdateContactComp().unmount();
      expect(resetSuccessSpy).toBeCalledTimes(0);
    });
    it('Should call resetSuccess when the component is unmounted and props.success is true', () => {
      props.success = true;
      const UpdateContactComp = () => shallow(<UpdateContact { ...props } />);
      UpdateContactComp().unmount();
      expect(resetSuccessSpy).toBeCalledTimes(1);
    });
  });
});
