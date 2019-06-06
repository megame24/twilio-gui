import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Input from '../components/Input';
import Loading from '../components/Loading';
import generalActions from '../actions/generalActions';
import contactActions from '../actions/contactActions';
import ErrorMessage from '../components/ErrorMessage';

/**
 * UpdateContact component
 */
export class UpdateContact extends React.Component {
  /**
   * Constructor function
   * @returns {undefined}
   */
  constructor() {
    super();
    this.id = null;
    this.state = {
      formData: {
        name: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * component did mount
   * @returns {undefined}
   */
  componentDidMount() {
    const { match: { params }, getContactToBeUpdated } = this.props;
    this.id = params.id;
    getContactToBeUpdated(this.id);
  }

  /**
   * component will receive props
   * @param {Object} nextProps
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { contactToBeUpdated } = this.props;
    if (nextProps.contactToBeUpdated !== contactToBeUpdated) {
      this.setState({
        formData: {
          name: nextProps.contactToBeUpdated.name || '',
          phoneNumber: nextProps.contactToBeUpdated.phoneNumber,
        }
      });
    }
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
   * handle form submit
   * @param {Object} event event object
   * @returns {undefined}
   */
  handleSubmit(event) {
    event.preventDefault();
    const { updateContact } = this.props;
    const { formData } = this.state;
    updateContact(formData, this.id);
  }

  /**
   * @return {Function} JSX function
   */
  render() {
    const { formData: { name } } = this.state;
    const { isLoading, success,
      contactToBeUpdatedErrs, contactUpdateErrs } = this.props;
    contactToBeUpdatedErrs.time = new Date();
    contactUpdateErrs.time = new Date();
    return (
      <div id="update-contact">
        <div className="errors">
          <ErrorMessage
            errors={contactToBeUpdatedErrs}
          />
          <ErrorMessage
            errors={contactUpdateErrs}
          />
        </div>
        <Loading isLoading={isLoading} />
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            className="input"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <input
            className="input btn btn-primary"
            type="submit"
            id="submit-btn"
            value="Update contact"
          />
        </form>
        {
          success && <Redirect to={`/contacts/${this.id}`} />
        }
      </div>
    );
  }
}

UpdateContact.propTypes = {
  resetSuccess: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  getContactToBeUpdated: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  contactToBeUpdatedErrs: PropTypes.shape({
    message: PropTypes.string
  }),
  contactUpdateErrs: PropTypes.shape({
    message: PropTypes.string
  }),
  contactToBeUpdated: PropTypes.shape({
    phoneNumber: PropTypes.string,
    name: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }),
  }).isRequired,
};

UpdateContact.defaultProps = {
  contactToBeUpdated: {
    name: '',
    phoneNumber: '',
  },
  contactToBeUpdatedErrs: {},
  contactUpdateErrs: {},
};

export const mapStateToProps = ({
  activeContact: { contactToBeUpdated, errors: contactToBeUpdatedErrs },
  contactUpdate: { success, isLoading, errors: contactUpdateErrs }
}) => ({
  success,
  isLoading,
  contactToBeUpdated,
  contactToBeUpdatedErrs,
  contactUpdateErrs
});

export default connect(mapStateToProps, {
  getContactToBeUpdated: contactActions.getContactToBeUpdated,
  updateContact: contactActions.updateContact,
  resetSuccess: generalActions.resetSuccess,
})(UpdateContact);
