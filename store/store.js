import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice';

export const store = configureStore({
    devTools: true,
    reducer: {
        game: gameReducer,
    },
});
