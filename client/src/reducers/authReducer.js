import types from '../actions/actionTypes';

const {
  PERSIST_LOGIN, LOGIN, CLEAR_ERRORS, HIDE_SIDE_NAV,
  UN_HIDE_SIDE_NAV
} = types;

export const initialState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  token: '',
  hideSideNav: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case HIDE_SIDE_NAV:
    return {
      ...state,
      hideSideNav: 'hide',
    };
  case UN_HIDE_SIDE_NAV:
    return {
      ...state,
      hideSideNav: '',
    };
  case CLEAR_ERRORS:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
    };
  case types.LOGOUT:
    return {
      ...state,
      token: '',
    };
  case PERSIST_LOGIN:
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    };
  case `${LOGIN}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${LOGIN}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      token: action.payload.token,
    };
  case `${LOGIN}_FAILURE`:
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
