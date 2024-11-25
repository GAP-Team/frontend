// store/index.js
"use client";
import storage from "redux-persist/lib/storage";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import buildingReducer from "./features/buildingSlice";
import snackbarReducer from "./features/snackbarSlice";
import tenderReducer from "./features/tenderSlice";

const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
  tender: tenderReducer,
  building: buildingReducer,
});

const persistConfig = {
  key: "root",
  storage,
  timeout: 1000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeConfiguredStore = (): any =>
  configureStore({
    reducer: rootReducer,
  });

export const makeStore = (): any => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
          },
        }),
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);
export const persistor = persistStore(makeStore());

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;
