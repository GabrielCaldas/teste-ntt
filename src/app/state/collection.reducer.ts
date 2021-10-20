import { createReducer, on } from '@ngrx/store';
import { addMovie , removeMovie } from './favorite-list.actions';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  on(removeMovie, (state, { movieId}) => state.filter((id) => id !== movieId)),
  on(addMovie, (state, { movieId }) => {
    if (state.indexOf(movieId) > -1) return state;

    return [...state, movieId];
  })
);