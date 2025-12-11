import { configureStore } from '@reduxjs/toolkit';
import gameReducer, { syncWithLocalStorage } from './gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabilita controllo per Date e Set
    }).concat(syncWithLocalStorage),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
