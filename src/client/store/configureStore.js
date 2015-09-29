import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

	const loggerMiddleware = createLogger();

	const createStoreWithMiddleware = applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)(createStore);

	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers');
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
