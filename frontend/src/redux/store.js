import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Importando thunk corretamente
import { composeWithDevTools } from '@redux-devtools/extension';
import reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
