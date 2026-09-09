import { createReducer, on } from '@ngrx/store';
import { UserDetailsActions } from './user-details.actions';

export const userDetailsFeatureKey = 'userDetails';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(initialState);
