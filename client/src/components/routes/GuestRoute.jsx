import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const GuestRoute = ({
  token, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={
      props => (
        !token ? <Component {...props} />
          : <Redirect to="/" />
      )}
  />
);
export const mapStateToProps = (state) => {
  const { token } = state.auth;
  return {
    token,
  };
};
GuestRoute.propTypes = {
  token: PropTypes.string,
  component: PropTypes.func.isRequired
};
GuestRoute.defaultProps = {
  token: '',
};

export default connect(mapStateToProps)(GuestRoute);
