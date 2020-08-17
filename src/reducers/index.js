import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import companyReducer from './company-reducer';
import sessionReducer from './session-reducer';

const rootReducer = combineReducers({
  companies: companyReducer,
  session: sessionReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
