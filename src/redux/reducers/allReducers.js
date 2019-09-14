import { combineReducers } from 'redux';
import post from './postReducer';
import comment from './commentsReducer';
import currentPost from './currentPostReducer';
import showModal from './toggleModalReducer';

const rootReducer = combineReducers({
  post,
  comment,
  currentPost,
  showModal,
});

export default rootReducer;
