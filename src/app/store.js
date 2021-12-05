import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/slice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
const persistConfig = {
    key: 'root',
    storage: storage,
};

const _persistedReducer = persistReducer(persistConfig, userReducer);

export default configureStore({
    reducer: {
        user: _persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }),
    }
})