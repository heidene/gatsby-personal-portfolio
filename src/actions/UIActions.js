import { SET_SCROLLLOCK, SET_LANG, DONE_LOADING } from './types';

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
