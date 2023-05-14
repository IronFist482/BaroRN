import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  purgeStoredState,
  PersistConfig,
} from "redux-persist";

// Actions
// import { productsSlice } from "./products/products-slice";
import { sessionSlice } from "./session/session-slice";
import { gastosSlice } from "./gastos/gastos-slice";
import { frecuentesSlice } from "./frecuente/frecuente-slice";

type ExtractCombinedReducers<S> = S extends (...args: any[]) => any
  ? S extends (...args: any[]) => infer R
    ? R extends Record<string, any>
      ? R
      : never
    : never
  : never;

type Result = ExtractCombinedReducers<typeof rootReducer>;
// Persist config
const persistConfig: PersistConfig<Result> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["session", "gastos", "frecuentes"],
};

// Root reducer
const rootReducer = combineReducers({
  session: sessionSlice.reducer,
  gastos: gastosSlice.reducer,
  frecuentes: frecuentesSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const resetStore = async () => {
  store.dispatch(sessionSlice.actions.removeToken());

  await persistor.purge();
  await purgeStoredState({ storage: AsyncStorage, key: "root" });
};

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
