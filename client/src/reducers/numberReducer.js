import types from '../actions/actionTypes';

const {
  GET_AVAILABLE_NUMBERS
} = types;

export const initialState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  availableNums: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case `${GET_AVAILABLE_NUMBERS}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${GET_AVAILABLE_NUMBERS}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      availableNums: action.payload.data.availableNumbers,
    };
  case `${GET_AVAILABLE_NUMBERS}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  default:
    return state;
  }
};
