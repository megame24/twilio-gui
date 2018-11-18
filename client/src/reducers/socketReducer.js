import types from '../actions/actionTypes';

const {
  SOCKET_CONNECTED, LOGIN
} = types;

export const initialState = {
  connected: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SOCKET_CONNECTED:
  case `${LOGIN}_LOADING`:
    return {
      ...state,
      connected: true
    };
  case `${LOGIN}_FAILURE`:
    return {
      ...state,
      connected: false
    };
  default:
    return state;
  }
};
