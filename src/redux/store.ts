import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './authslice'
import searchReducer from './searchSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// combine all reducers first
const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only persist the auth slice
}

// wrap the rootReducer, not just one slice
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
