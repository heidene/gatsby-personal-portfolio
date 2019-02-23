import { combineReducers } from 'redux';
import IndexReducer from './IndexReducer';
import LocaleReducer from './LocaleReducer';
import UIReducer from './UIReducer';

export default combineReducers({
  indexState: IndexReducer,
  locales: LocaleReducer,
  ui: UIReducer,
});
