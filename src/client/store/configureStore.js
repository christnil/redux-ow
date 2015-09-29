import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

	const loggerMiddleware = createLogger();

	const createStoreWithMiddleware = applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)(createStore);

	const finalCreateStore = compose(
		applyMiddleware(thunkMiddleware,loggerMiddleware),
		devTools(),
		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
	)(createStore);

	const store = finalCreateStore(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers');
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
