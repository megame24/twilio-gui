import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SideNav from '../SideNav';

export const UserRoute = ({
  token, component: Component, role, ...rest
}) => (
  <Route
    {...rest}
    render={
      props => (
        token ? (
          <div>
            <Route component={SideNav} />
            <Component {...props} />
          </div>
        )
          : <Redirect to="/auth" />
      )}
  />
);
export const mapStateToProps = (state) => {
  const { token } = state.auth;
  return {
    token,
  };
};
UserRoute.propTypes = {
  token: PropTypes.string,
  component: PropTypes.func.isRequired,
};
UserRoute.defaultProps = {
  token: '',
};

export default connect(mapStateToProps)(UserRoute);
