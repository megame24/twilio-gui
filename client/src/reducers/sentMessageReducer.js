import types from '../actions/actionTypes';

const { NEW_CONTACT_MSG, RESET_SUCCESS, CLEAR_ERRORS, OLD_CONTACT_MSG } = types;

export const initialState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  success: false,
  sentTo: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case CLEAR_ERRORS:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
    };
  case RESET_SUCCESS:
    return {
      ...state,
      success: false,
    };
  case `${NEW_CONTACT_MSG}_LOADING`:
  case `${OLD_CONTACT_MSG}_LOADING`: {
    console.log('yo');
    return {
      ...state,
      isLoading: true,
    };
  }
  case `${NEW_CONTACT_MSG}_SUCCESS`:
  case `${OLD_CONTACT_MSG}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      success: true,
      sentTo: action.payload.data.contact
    };
  case `${NEW_CONTACT_MSG}_FAILURE`:
  case `${OLD_CONTACT_MSG}_FAILURE`:
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
