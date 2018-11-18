import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import contactActions from '../actions/contactActions';
import Loading from '../components/Loading';
import socket from '../repositories/Socket';
import Textarea from '../components/Textarea';
import messageActions from '../actions/messageActions';
import generalActions from '../actions/generalActions';

/**
 * OldContactMsg component
 */
export class OldContactMsg extends React.Component {
  /**
   * @returns {undefined}
   */
  constructor() {
    super();
    this.id = null;
    this.state = {
      formData: {
        message: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }


  /**
   * component did mount
   * @returns {null} null
   */
  componentDidMount() {
    const {
      getContact, match: { params }, getContactMessages,
      getContacts, token
    } = this.props;
    this.id = params.id;
    this.scrollToBottom();
    getContact(this.id);
    getContactMessages(this.id);
    socket
      .emitMessage('active contact', {
        contactId: this.id, token
      }, () => {
        getContacts();
      });
    const objDiv = document.getElementById('chat-messages');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  /**
   * component will receive props
   * @param {Object} nextProps
   * @returns {null} null
   */
  componentWillReceiveProps(nextProps) {
    const {
      match: { params }, getContactMessages, getContacts, getContact,
      success, resetSuccess, token
    } = this.props;
    this.scrollToBottom();
    if (nextProps.match.params.id !== params.id) {
      this.id = nextProps.match.params.id;
      getContact(this.id);
      getContactMessages(this.id);
      socket
        .emitMessage('active contact', {
          contactId: this.id, token
        }, () => {
          getContacts();
        });
    }
    if (nextProps.success !== success) {
      getContactMessages(this.id);
      resetSuccess();
    }
  }

  /**
   * component did update
   * @returns {null} null
   */
  componentDidUpdate() {
    this.scrollToBottom();
  }


  /**
   * component did update
   * @returns {undefined}
   */
  componentWillUnmount() {
    const { clearActiveContact } = this.props;
    clearActiveContact();
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
    formData.contactId = this.id;
    const { messageOldContact } = this.props;
    if (event.key === 'Enter' && !event.shiftKey) {
      messageOldContact(formData);
      this.setState({ formData: { message: '' } });
    }
  }

  /**
   * Handle scroll to bottom
   * @returns {undefined}
   */
  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * @return {undefined}
   */
  render() {
    const {
      activeContactIsLoading, activeContact, contactMsgsIsLoading,
      messages, sentMsgIsLoading,
    } = this.props;
    const { formData: { message } } = this.state;
    return (
      <div id="old-contact">
        <Loading
          isLoading={activeContactIsLoading
          || contactMsgsIsLoading
          || sentMsgIsLoading}
        />
        <div className="contact-info">
          <h3>
            {activeContact.name}
            <br />
            {activeContact.number}
          </h3>
          <Link
            to={`/contacts/${activeContact.id}/update`}
            className="update-contact"
          >
            <i className="ion-android-create" />
            Update contact
          </Link>
        </div>
        <div id="chat-box">
          <div id="chat-messages">
            {
              Object.values(messages).map(msg => (
                <div
                  id="msg"
                  key={msg.id}
                  className={
                    msg.from.id === activeContact.id ? 'to-me' : 'from-me'
                  }
                >
                  {
                    msg.media && <img alt="roo-media" src={msg.media} />
                  }
                  <Linkify>{msg.body}</Linkify>
                </div>
              ))
            }
            <div className="scroll-bottom" ref={(el) => { this.el = el; }} />
          </div>
        </div>
        <div className="send-message">
          <Textarea
            placeholder="Message"
            className="input"
            name="message"
            value={message}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );
  }
}

OldContactMsg.propTypes = {
  clearActiveContact: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  resetSuccess: PropTypes.func.isRequired,
  messageOldContact: PropTypes.func.isRequired,
  getContact: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  getContactMessages: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }),
  }).isRequired,
  success: PropTypes.bool.isRequired,
  sentMsgIsLoading: PropTypes.bool.isRequired,
  activeContactIsLoading: PropTypes.bool.isRequired,
  contactMsgsIsLoading: PropTypes.bool.isRequired,
  activeContact: PropTypes.shape({
    number: PropTypes.string
  }),
  messages: PropTypes.shape({
    id: PropTypes.string
  }),
};

OldContactMsg.defaultProps = {
  activeContact: {},
  messages: {},
};

export const mapStateToProps = ({
  activeContact: { activeContact, isLoading: activeContactIsLoading },
  contactMessages: { messages, isLoading: contactMsgsIsLoading },
  sentMessage: { success, isLoading: sentMsgIsLoading }, auth: { token }
}) => ({
  activeContact,
  activeContactIsLoading,
  messages,
  contactMsgsIsLoading,
  sentMsgIsLoading,
  success,
  token,
});

export default connect(mapStateToProps, {
  getContact: contactActions.getContact,
  getContactMessages: contactActions.getContactMessages,
  getContacts: contactActions.getContacts,
  messageOldContact: messageActions.messageOldContact,
  resetSuccess: generalActions.resetSuccess,
  clearActiveContact: contactActions.clearActiveContact,
})(OldContactMsg);
