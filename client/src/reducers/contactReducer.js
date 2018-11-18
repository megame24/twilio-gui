import types from '../actions/actionTypes';

const {
  GET_CONTACTS, CLEAR_ACTIVE_CONTACT, GET_CONTACT, GET_CONTACT_MESSAGES,
  APPEND_TO_CONTACT_MESSAGES, UPDATE_CONTACT, GET_CONTACT_NOT_ACTIVE
} = types;

export const initialContactsState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  contacts: {},
};

export const contacts = (state = initialContactsState, action = {}) => {
  switch (action.type) {
  case `${GET_CONTACTS}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${GET_CONTACTS}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      contacts: (() => {
        const contactList = {};
        action.payload.data.contactList.forEach((contact) => {
          contactList[contact.id] = contact;
        });
        return contactList;
      })(),
    };
  case `${GET_CONTACTS}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  default:
    return state;
  }
};

export const initialActiveContactState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  activeContact: {
    name: '',
    number: '',
  },
  notActiveContact: {
    name: '',
    number: '',
  }
};

export const activeContact = (
  state = initialActiveContactState, action = {}
) => {
  switch (action.type) {
  case `${CLEAR_ACTIVE_CONTACT}`:
    return {
      ...state,
      activeContact: {
        name: '',
        number: '',
      }
    };
  case `${GET_CONTACT}_LOADING`:
  case `${GET_CONTACT_NOT_ACTIVE}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${GET_CONTACT}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      activeContact: action.payload.data.user,
    };
  case `${GET_CONTACT_NOT_ACTIVE}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      notActiveContact: action.payload.data.user,
    };
  case `${GET_CONTACT}_FAILURE`:
  case `${GET_CONTACT_NOT_ACTIVE}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  default:
    return state;
  }
};


export const initialContactMessages = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  messages: {},
};

export const contactMessages = (
  state = initialContactMessages, action = {}
) => {
  switch (action.type) {
  case `${APPEND_TO_CONTACT_MESSAGES}`:
    return {
      ...state,
      messages: {
        ...state.messages,
        [action.payload.id]: action.payload
      }
    };
  case `${GET_CONTACT_MESSAGES}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${GET_CONTACT_MESSAGES}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      messages: (() => {
        const messages = {};
        action.payload.data.messages.forEach((message) => {
          messages[message.id] = message;
        });
        return messages;
      })(),
    };
  case `${GET_CONTACT_MESSAGES}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  default:
    return state;
  }
};


export const initialUpdateContactState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  success: false,
};

export const contactUpdate = (
  state = initialUpdateContactState, action = {}
) => {
  switch (action.type) {
  case `${APPEND_TO_CONTACT_MESSAGES}`:
    return {
      ...state,
      messages: {
        ...state.messages,
        [action.payload.id]: action.payload
      }
    };
  case `${UPDATE_CONTACT}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${UPDATE_CONTACT}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      success: true,
    };
  case `${UPDATE_CONTACT}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  default:
    return state;
  }
};
