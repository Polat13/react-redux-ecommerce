import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import themeReducer from "./slices/themeSlice";
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice";
import cardReducer from "./slices/cardSlice";

const customStorage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const rootReducer = combineReducers({
  theme: themeReducer,
  language: languageReducer,
  auth: authReducer,
  card: cardReducer,
});

const persistConfig = {
  key: "root",
  storage: customStorage,
  whitelist: ["theme", "language", "auth", "card"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
