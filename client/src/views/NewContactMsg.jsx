import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Textarea from '../components/Textarea';
import Input from '../components/Input';
import messageActions from '../actions/messageActions';
import Loading from '../components/Loading';
import generalActions from '../actions/generalActions';
import ErrorMessage from '../components/ErrorMessage';

/**
 * NewContactMsg component
 */
export class NewContactMsg extends React.Component {
  /**
   * @returns {undefined}
   */
  constructor() {
    super();
    this.state = {
      formData: {
        phoneNumber: '',
        message: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  /**
   * @returns {undefined}
   */
  componentWillUnmount() {
    const {
      success, resetSuccess
    } = this.props;
    if (success) resetSuccess();
  }

  /**
   * handle change on form fields
   * @param {Object} event event object
   * @returns {undefined}
   */
  handleChange(event) {
    event.persist();
    this.setState(state => (
      {
        ...state,
        formData: {
          ...state.formData, [event.target.name]: event.target.value
        },
      }
    ));
  }

  /**
   * handle change on Textarea field
   * @param {Object} event event object
   * @returns {undefined}
   */
  handleKeyPress(event) {
    const { formData } = this.state;
    const { messageNewContact } = this.props;
    if (event.key === 'Enter' && !event.shiftKey) {
      messageNewContact(formData);
    }
  }

  /**
   * @return {Function} JSX function
   */
  render() {
    const { formData: { phoneNumber, message } } = this.state;
    const { errors, isLoading, success, sentTo: { id } } = this.props;
    errors.time = new Date();
    return (
      <div id="new-contact">
        <div className="errors">
          <ErrorMessage
            errors={errors}
          />
        </div>
        <Loading isLoading={isLoading} />
        <div className="contact-info">
          <Input
            type="text"
            placeholder="Phone number"
            className="input"
            name="phoneNumber"
            value={phoneNumber}
            onChange={this.handleChange}
          />
        </div>
        <div className="message">
          <Textarea
            placeholder="Message"
            className="input"
            name="message"
            value={message}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        {
          success && <Redirect to={`/contacts/${id}`} />
        }
      </div>
    );
  }
}

NewContactMsg.propTypes = {
  messageNewContact: PropTypes.func.isRequired,
  resetSuccess: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string
  }),
  sentTo: PropTypes.shape({
    phoneNumber: PropTypes.string
  })
};

NewContactMsg.defaultProps = {
  sentTo: {},
  errors: {},
};

export const mapStateToProps = ({
  sentMessage: { success, isLoading, sentTo, errors }
}) => ({
  success,
  isLoading,
  sentTo,
  errors
});

export default connect(mapStateToProps, {
  messageNewContact: messageActions.messageNewContact,
  resetSuccess: generalActions.resetSuccess,
})(NewContactMsg);
