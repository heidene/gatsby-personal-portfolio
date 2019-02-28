import {
  SET_SCROLLLOCK,
  SET_LANG,
  DONE_LOADING,
  SET_VERTICAL_HEIGHT,
  SET_HERO_VISIBLE,
} from './types';

export const setScrollLock = (scrollLocked) => ({
  type: SET_SCROLLLOCK,
  payload: scrollLocked,
});

export const setLang = (lang) => ({
  type: SET_LANG,
  payload: lang,
});

export const doneLoading = () => ({
  type: DONE_LOADING,
});

export const setVerticalScrollHeight = (innerHeight) => ({
  type: SET_VERTICAL_HEIGHT,
  payload: innerHeight,
});

export const setHeroVisibility = (isVisible) => ({
  type: SET_HERO_VISIBLE,
  payload: isVisible,
});
