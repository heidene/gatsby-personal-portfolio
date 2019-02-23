import {
  SET_INDEX,
  SET_MAX_INDEX,
  INCREMENT,
  DECREMENT,
  STARTNAV,
  ENDNAV,
} from './types';

export const setIndex = (index) => ({
  type: SET_INDEX,
  payload: index,
});
export const setMaxIndex = (maxIndex) => ({
  type: SET_MAX_INDEX,
  payload: maxIndex,
});
export const increment = () => ({
  type: INCREMENT,
});
export const decrement = () => ({
  type: DECREMENT,
});
export const startNav = () => ({
  type: STARTNAV,
});
export const endNav = () => ({
  type: ENDNAV,
});
