import {
  SET_SCROLLLOCK,
  DONE_LOADING,
  SET_VERTICAL_HEIGHT,
  SET_HERO_VISIBLE,
} from '../actions/types';

const INITIAL_STATE = {
  scrollLocked: false,
  loaded: false,
  verticalHeight: 683,
  heroVisible: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SCROLLLOCK:
      return { ...state, scrollLocked: action.payload };
    case DONE_LOADING:
      return { ...state, loaded: true };
    case SET_VERTICAL_HEIGHT:
      return { ...state, verticalHeight: action.payload };
    case SET_HERO_VISIBLE:
      return { ...state, heroVisible: action.payload };
    default:
      return state;
  }
};
