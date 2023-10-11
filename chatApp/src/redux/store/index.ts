// store/index.ts
import { legacy_createStore as createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
