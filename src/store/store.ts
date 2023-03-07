import { configureStore } from "@reduxjs/toolkit";

import usersSlice from './slices/usersSlice'
import chatSlice from './slices/chatSlice'

const store = configureStore({
    reducer: {
        usersSlice,
        chatSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
})

export default store;
