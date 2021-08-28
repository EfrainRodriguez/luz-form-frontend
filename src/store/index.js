import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import settings from './slices/settings';
import form from './slices/form';
import auth from './slices/auth';

// persist config -------------------------------------------
const settingsPersistConfig = {
  key: 'settings',
  storage
};

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

// ----------------------------------------------------------

const store = configureStore({
  reducer: {
    settings: persistReducer(settingsPersistConfig, settings),
    form,
    auth: persistReducer(authPersistConfig, auth)
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  })
});

const persistor = persistStore(store);

export { store, persistor };
