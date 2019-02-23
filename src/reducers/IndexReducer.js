import {
  SET_INDEX,
  SET_MAX_INDEX,
  INCREMENT,
  DECREMENT,
  STARTNAV,
  ENDNAV,
} from '../actions/types';

const INITIAL_STATE = {
  index: 0,
  previousIndex: 0,
  maxIndex: 0,
  navigating: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MAX_INDEX:
      return { ...state, maxIndex: action.payload };
    case SET_INDEX:
      return { ...state, previousIndex: state.index, index: action.payload };
    case INCREMENT:
      return { ...state, previousIndex: state.index, index: state.index + 1 };
    case DECREMENT:
      return { ...state, previousIndex: state.index, index: state.index - 1 };
    case STARTNAV:
      return { ...state, navigating: true };
    case ENDNAV:
      return { ...state, navigating: false };
    default:
      return state;
  }
};
