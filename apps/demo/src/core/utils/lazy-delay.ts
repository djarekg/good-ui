import { type ComponentType, lazy } from 'react';
import { delay } from './delay.js';

/**
 * Helper to lazy-load a component and delay the resolution by `ms` milliseconds.
 * Accepts a factory function () => import('...') so bundlers keep static imports.
 */
export const lazyDelay = <T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  ms = 3000
) => lazy(() => Promise.all([factory(), delay(ms)]).then(([module]) => module));
