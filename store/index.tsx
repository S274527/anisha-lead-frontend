import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeConfigSlice from "@/store/themeConfigSlice";
import authSlice from "@/store/authSlice";
import loaderSlice from "@/store/loaderSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  auth: authSlice,
  loader: loaderSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof rootReducer>;
