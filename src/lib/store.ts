// store/index.js
"use client";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

const createNoopStorage = (): any => {
  return {
    getItem(_key: any): any {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any): any {
      return Promise.resolve(value);
    },
    removeItem(_key: any): any {
      return Promise.resolve();
    },
  };
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: typeof window !== "undefined" ? storage : createNoopStorage(),
};

const makeConfiguredStore = (): any =>
  configureStore({
    reducer: rootReducer,
  });

export const makeStore = (): any => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;
