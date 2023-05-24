import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

// reducers
import frecuentesSlice from "./frecuentes/frecuentes-slice";
import gastosSlice from "./gastos/gastos-slice";
import ingresosSlice from "./ingresos/ingresos-slice";
import userSlice from "./user/user-slice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "gastos", "frecuentes", "ingresos"],
};

export const rootReducers = combineReducers({
  user: userSlice,
  gastos: gastosSlice,
  frecuentes: frecuentesSlice,
  ingresos: ingresosSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  // devTools: config.env === "development",z
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
