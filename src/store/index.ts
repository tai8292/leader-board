import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import dataReducer from './reducers/dataReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer as any, composedEnhancer);

export default store;
