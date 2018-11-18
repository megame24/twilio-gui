import types from './actionTypes';

const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

const resetSuccess = () => ({
  type: types.RESET_SUCCESS,
});

export default {
  clearErrors,
  resetSuccess,
};
