import { SET_LANG } from '../actions/types';

const INITIAL_STATE = {
  lang: `nl`,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LANG:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};
