import { createSelector } from 'reselect';

import { AppState } from '../reducer';
import { Vrf } from './types';

const getPending = (state: AppState) => state.vrf.pending;

const getRandomNumbers = (state: AppState) => state.vrf.randomNumbers;

const getError = (state: AppState) => state.vrf.error;

export const getVrfsSelector = createSelector(
  getRandomNumbers,
  (randomNumbers: Vrf[]) => randomNumbers,
);

export const getPendingSelector = createSelector(
  getPending,
  (pending: boolean) => pending,
);

export const getErrorSelector = createSelector(
  getError,
  (error: string | null) => error,
);
