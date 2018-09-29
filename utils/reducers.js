const initialState = {
  messages: {
    messageId: 2,
    messages: [],
    isTyping: false,
    currentMessage: '',
  },
  users: {
    users: [],
    isRefreshing: false,
    page: 1,
    seed: 1,
    error: null,
  },
  loginInfo: {
    currentUser: 'Khoa'
  }
};

export const messages = (state = initialState.messages, action) => {
  switch(action.type) {
  case 'START_LOAD_MESSAGES': {
    return {
      ...state,
    };
  }
  case 'FINISH_LOAD_MESSAGES': {
    return {
      ...state,
      messages: action.messages
    };
  }
  case 'RECEIVE_MESSAGE': {
    return {
      ...state,
      messages: state.messages.concat(action.message)
    };
  }
  case 'SET_CURRENT_MESSAGE': {
    return {
      ...state,
      currentMessage: action.message
    };
  }
  default:
    return state;
  }
};

export const users = (state = initialState.users, action) => {
  switch(action.type) {
  case 'START_FETCHING_USERS': {
    return {
      ...state,
    };
  }
  case 'FINISH_FETCHING_USERS': {
    return {
      ...state,
      users: action.users
    };
  }
  default:
    return state;
  }
};

export const loginInfo = (state = initialState.loginInfo, action) => state;