import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import contactActions from '../actions/contactActions';
import authActions from '../actions/authActions';
import socket from '../repositories/Socket';
import ErrorMessage from './ErrorMessage';

/**
 * SideNav component
 */
export class SideNav extends React.Component {
  /**
   * component did mount
   * @returns {undefined}
   */
  componentDidMount() {
    const { getContacts, contacts } = this.props;
    if (Object.keys(contacts).length < 1) {
      getContacts();
    }
  }

  /**
   * component will receive props
   * @param {Object} nextProps
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { getContacts, token } = this.props;
    if (nextProps.token !== token) {
      getContacts();
    }
  }

  /**
   * logout
   * @returns {undefined}
   */
  logout = () => {
    const { logout } = this.props;
    socket.disconnect();
    logout();
  }

  /**
   * @return {Function} JSX function
   */
  render() {
    const { contacts, errors } = this.props;
    errors.time = new Date();
    return (
      <div id="side-nav">
        <div className="errors">
          <ErrorMessage
            errors={errors}
          />
        </div>
        <Link to="/" className="new-message">
          <i className="ion-plus-circled" />
          New Message
        </Link>
        <a to="#" onClick={this.logout} className="logout">Logout</a>
        <div className="contact-list">
          <h2>Contacts</h2>
          <ul>
            {
              Object.values(contacts).map(contact => (
                <li key={contact.id}>
                  <Link to={`/contacts/${contact.id}`} className="contact">
                    <i className="ion-android-contact" />
                    <span>
                      {contact.name && <p className="name">{contact.name}</p>}
                      <p>{contact.phoneNumber}</p>
                    </span>
                    {
                      contact.notifications
                      && (
                        <span className="notifn">
                          <i className="ion-android-mail" />
                        </span>
                      )
                    }
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  logout: PropTypes.func.isRequired,
  token: PropTypes.string,
  getContacts: PropTypes.func.isRequired,
  contacts: PropTypes.shape({
    phoneNumber: PropTypes.string
  }),
  errors: PropTypes.shape({
    message: PropTypes.string
  }),
};

SideNav.defaultProps = {
  token: '',
  contacts: {},
  errors: {},
};

export const mapStateToProps = ({
  contacts: { contacts, errors },
  auth: { token }
}) => ({
  contacts,
  token,
  errors,
});

export default connect(mapStateToProps, {
  getContacts: contactActions.getContacts,
  logout: authActions.logout
})(SideNav);
