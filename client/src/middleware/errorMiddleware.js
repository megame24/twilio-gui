import isPromise from 'is-promise';

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
      errors.message = apiErrors.data.error.message;
      if (!apiErrors.data.error.message) {
        errors.response = apiErrors.data.error;
      }
    }
    action.payload = errors;
  }
  return next(action);
};

export default errorMiddleware;
