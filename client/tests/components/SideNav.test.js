import React from 'react';
import { shallow } from "enzyme";
import { SideNav, mapStateToProps } from '../../src/components/SideNav';

describe('Testing SideNav component', () => {
  describe("Testing mapStateToProps", () => {
    it("should map the state to the props correctly", () => {
      const state = {
        contacts: {
          errors: {},
          contacts: {},
        },
        auth: {
          token: 'token',
        }
      };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual({
        contacts: {}, errors: {}, token: 'token'
      });
    });
  });
  describe('Testing component methods', () => {
    const logoutSpy = jest.fn();
    const getContactsSpy = jest.fn();
    const props = {
      logout: logoutSpy,
      getContacts: getContactsSpy,
      contacts: {},
      errors: {},
      token: 'token'
    }
    const SideNavComp = () => shallow(<SideNav { ...props } />);
    it('Should call getContacts when the component is mounted and the contacts object is empty', () => {
      SideNavComp();
      expect(getContactsSpy).toHaveBeenCalledTimes(1);
    });
    it('Should call getContacts when componentWillReceiveProps is called and the token has changed', () => {
      const SideNavCompt = SideNavComp();
      SideNavCompt.setProps({ token: 'newToken' });
      expect(getContactsSpy).toHaveBeenCalledTimes(3);
    });
    it('Should call props.logout when logout is called', async () => {
      const SideNavCompInstance = SideNavComp().instance();
      SideNavCompInstance.logout();
      expect(logoutSpy).toHaveBeenCalledTimes(1);
    });
  });
});
