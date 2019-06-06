import axiosInstance from '../services/axiosInstance';
import types from './actionTypes';

const getAvailableNums = () => ({
  type: types.GET_AVAILABLE_PHONE_NUMBERS,
  payload: axiosInstance().get('/phoneNumbers'),
});

export default {
  getAvailableNums,
};
