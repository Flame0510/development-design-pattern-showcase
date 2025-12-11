/**
 * COMPONENT TYPE: Utility
 * SECTION: State Management
 *
 * ROLE:
 * - Provide type-safe Redux hooks for components
 * - Replace generic useDispatch and useSelector with typed versions
 * - Ensure TypeScript autocomplete for state and actions
 *
 * PATTERNS USED:
 * - Custom Hooks - Typed wrappers over Redux hooks
 * - Type-safe Redux - Enforce correct state and dispatch types
 *
 * NOTES FOR CONTRIBUTORS:
 * - Always use these hooks instead of generic Redux hooks
 * - useAppSelector provides autocomplete for state shape
 * - useAppDispatch ensures dispatched actions are type-checked
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// PATTERN: Custom Hooks - Type-safe Redux hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
