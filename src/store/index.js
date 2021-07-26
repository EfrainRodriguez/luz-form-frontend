import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import auth from './slices/auth';
import settings from './slices/settings';

// persist config -------------------------------------------

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: [
    'user',
    'remember',
    'accessToken',
    'refreshToken',
    'isAuthenticated'
  ]
};

const settingsPersistConfig = {
  key: 'settings',
  storage
};

// ----------------------------------------------------------

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, auth),
    settings: persistReducer(settingsPersistConfig, settings)
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  })
});

const persistor = persistStore(store);

export { store, persistor };
