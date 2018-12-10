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
  type: types.GET_AVAILABLE_NUMBERS,
  payload: axiosInstance().get('/numbers'),
});

export default {
  login,
  logout,
  getAvailableNums,
};
