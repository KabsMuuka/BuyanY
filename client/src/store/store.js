import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducerSlice from "../reducer/reducerSlice";

const persistConfig = {
  key: "root",
  storage, // Use localStorage for persistence
  whitelist: ["auth"], // Only persist the 'auth' slice
};

const persistedReducer = persistReducer(persistConfig, reducerSlice);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
