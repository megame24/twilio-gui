import axiosInstance from '../services/axiosInstance';
import types from './actionTypes';

const login = formData => ({
  type: types.LOGIN,
  payload: axiosInstance().post('/auth', formData),
});

const logout = () => ({
  type: types.LOGOUT,
});

const getAvailableNums = () => ({
  type: types.GET_AVAILABLE_PHONE_NUMBERS,
  payload: axiosInstance().get('/phoneNumbers'),
});

export default {
  login,
  logout,
  getAvailableNums,
};
