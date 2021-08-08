import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import settings from './slices/settings';
import form from './slices/form';

// persist config -------------------------------------------
const settingsPersistConfig = {
  key: 'settings',
  storage
};

// ----------------------------------------------------------

const store = configureStore({
  reducer: {
    settings: persistReducer(settingsPersistConfig, settings),
    form
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  })
});

const persistor = persistStore(store);

export { store, persistor };
