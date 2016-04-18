import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import * as reducerGlobal from './reducer-global';
import * as reducerPage1 from './reducer-page1';

const reducer = combineReducers(Object.assign({}, 
	reducerGlobal,
	reducerPage1,
	{ routing: routeReducer }
));

export default reducer;