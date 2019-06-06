import isPromise from 'is-promise';

/**
 * Error middleware
 * @param {Function} next next function in the middleware chain
 * @returns {Function} next call
 */
const errorMiddleware = () => next => (action) => {
  if (!action) return;
  if (isPromise(action.payload)) {
    return next(action).catch(err => err);
  }
  // return a well structured error on failure
  if (action.type.includes('FAILURE')) {
    const errors = {
      statusCode: 0,
      message: action.payload.message,
      response: {}
    };
    if (action.payload.response) {
      const apiErrors = action.payload.response;
      errors.statusCode = apiErrors.status;
      errors.message = apiErrors.data.errors.message;
      if (!apiErrors.data.errors.message) {
        errors.response = apiErrors.data.errors;
      }
    }
    action.payload = errors;
  }
  return next(action);
};

export default errorMiddleware;
