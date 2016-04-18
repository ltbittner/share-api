import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import reducer from './reducers/index';

const configureStore = (initialState) => {
	const reduxRouterMiddleware = syncHistory(browserHistory);
	const createDevStore = compose(applyMiddleware(reduxRouterMiddleware), typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f)(createStore);
	const createProdStore = applyMiddleware(reduxRouterMiddleware)(createStore);

	let store;
	if(process.env.NODE_ENV == 'development') {
		store = createDevStore(reducer, initialState);
		if(module.hot) {
	    module.hot.accept('./reducers', () => {
	      store.replaceReducer(require('./reducers/index').default);
	    });
	  }
	} else {
		store = createProdStore(reducer, initialState);
	}
	reduxRouterMiddleware.listenForReplays(store);
	return store;
};

export default configureStore();