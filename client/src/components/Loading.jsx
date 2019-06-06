import React from 'react';
import { PropTypes } from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = ({ isLoading }) => (
  <Dimmer
    page
    active={isLoading}
  >
    <Loader size="medium" />
  </Dimmer>
);

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loading;
