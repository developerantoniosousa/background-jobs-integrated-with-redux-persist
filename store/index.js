import { createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { reducer as log } from './modules/log';

const reducers = combineReducers({
  log,
});

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};

const persistedReducers = persistReducer(persistConfig, reducers);

let rehydrationComplete;
let rehydrationFailed;
const rehydrationPromise = new Promise((resolve, reject) => {
  rehydrationComplete = resolve;
  rehydrationFailed = reject;
});

export const rehydration = () => rehydrationPromise;

export const store = createStore(persistedReducers);

export const persistor = persistStore(store, null, () => {
  if (store.getState()._persist.rehydrated) {
    rehydrationComplete();
  } else {
    rehydrationFailed(new Error('rehydration not worked'));
  }
});
