import constants from './constants';

const initialState = {
  user: {
    id: '',
    username: '',
  },
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_TOKEN: {
      return Object.assign({}, state, { token: action.token });
    }
    case constants.SET_USER: {
      const { data } = action;
      return { ...state, ...data };
    }
    case constants.LOGOUT: {
      return { ...state, ...initialState };
    }
    default:
      return state;
  }
};

export default reducer;