import axiosInstance from '../services/axiosInstance';
import types from './actionTypes';

const getAvailableNums = () => ({
  type: types.GET_AVAILABLE_NUMBERS,
  payload: axiosInstance().get('/numbers'),
});

export default {
  getAvailableNums,
};
