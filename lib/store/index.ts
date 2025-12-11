/**
 * COMPONENT TYPE: Store
 * SECTION: State Management
 *
 * ROLE:
 * - Configure Redux Toolkit store with game slice
 * - Add middleware for localStorage synchronization
 * - Export typed RootState and AppDispatch for type-safe hooks
 *
 * PATTERNS USED:
 * - Redux Toolkit - Centralized state management
 * - Middleware Pattern - syncWithLocalStorage for cross-window sync
 *
 * NOTES FOR CONTRIBUTORS:
 * - serializableCheck disabled to allow Set and Date in state
 * - syncWithLocalStorage middleware dispatches storage events
 * - Use useAppDispatch and useAppSelector hooks (in hooks.ts)
 */

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
