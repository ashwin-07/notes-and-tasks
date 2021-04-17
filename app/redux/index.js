import {createStore, applyMiddleware} from 'redux';
import notesReducer from './reducers/notesReducer';
import thunk from 'redux-thunk';

const store = createStore(notesReducer, applyMiddleware(thunk));

export default store;