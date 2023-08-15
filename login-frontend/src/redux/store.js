import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import alienReducer from "./alienSlice";



const persistConfig = {
    key: 'root', // Key for the persisted state in storage
    storage,
};
const persistedReducer = persistReducer(persistConfig, alienReducer)
const store = configureStore({
    reducer: {
        alien: persistedReducer,

    },
});

const persistor = persistStore(store);

export { store, persistor };