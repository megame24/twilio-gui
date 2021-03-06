import React from 'react';
import { PropTypes } from 'prop-types';
import { Message } from 'semantic-ui-react';

/**
 * ErrorMessage component
 */
export class ErrorMessage extends React.Component {
  _isMounted = false;

  state = { visible: false }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    this._isMounted = true;
  }

  /**
   * @returns {undefined}
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @returns {undefined}
   */
  handleDismiss = () => {
    this.setState({ visible: false });
  }

  /**
   * @returns {undefined}
   */
  dismissOnTimeout = () => {
    let timeout = 10000;
    if (process.env.NODE_ENV === 'test') timeout = 1;
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this._isMounted) {
          this.setState({ visible: false });
        }
        resolve();
      }, timeout);
    });
  }

  /**
   * component will receive props
   * @param {Object} nextProps
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { errors } = this.props;
    if (nextProps.errors.message && errors.time !== nextProps.errors.time) {
      this.setState({ visible: true });
      this.dismissOnTimeout();
    }
  }

  /**
   * @returns {Function} JSX function
   */
  render() {
    const { errors } = this.props;
    const { visible } = this.state;
    return (
      visible && (
        <Message
          negative
          onDismiss={this.handleDismiss}
          header={errors.message}
        />
      )
    );
  }
}

ErrorMessage.propTypes = {
  errors: PropTypes.shape({
    message: PropTypes.string,
    time: PropTypes.instanceOf(Date)
  }),
};

ErrorMessage.defaultProps = {
  errors: {},
};

export default ErrorMessage;
