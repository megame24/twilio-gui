import types from '../actions/actionTypes';

/**
 * authentication middleware that parses responses
 * and stores the token on success
 * @returns {Function} next
 */
const authMiddleware = () => next => (action) => {
  if (!action) return;
  if (action.type === `${types.LOGIN}_SUCCESS`) {
    const payloadData = action.payload.data;
    const { token } = payloadData;
    action.payload.token = token;
    localStorage.setItem('token', token);
  }
  if (action.type === types.LOGOUT) {
    localStorage.removeItem('token');
  }
  return next(action);
};

export default authMiddleware;
