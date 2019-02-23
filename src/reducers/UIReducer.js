import { SET_SCROLLLOCK, DONE_LOADING } from '../actions/types';

const INITIAL_STATE = {
  scrollLocked: true,
  loaded: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SCROLLLOCK:
      return { ...state, scrollLocked: action.payload };
    case DONE_LOADING:
      return { ...state, loaded: true };
    default:
      return state;
  }
};
