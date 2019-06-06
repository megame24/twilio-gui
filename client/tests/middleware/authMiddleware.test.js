import authMiddleware from '../../src/middleware/authMiddleware';

describe('Testing authMiddleware', () => {
  const next = action => action;
  it('should assign the token to the action`s payload on login success', () => {
    const action = {
      type: 'LOGIN_SUCCESS',
      payload: {
        data: {
          token: 'nested_token'
        }
      }
    }
    const result = authMiddleware()(next)(action);
    expect(result.payload.token).toEqual(action.payload.token);
  });
  it('should call next for every other action type', () => {
    const action = {
      type: 'LOGIN_FAILURE',
      payload: {
        response: {
          data: {
            error: {
              message: 'nested_error'
            }
          }
        }
      }
    }
    const result = authMiddleware()(next)(action);
    expect(result.payload.response.data.error.message).toEqual(action.payload.response.data.error.message);
  });
  it('Should clear localStorage on logout', () => {
    const action = {
      type: 'LOGOUT',
    }
    const result = authMiddleware()(next)(action);
  });
});
