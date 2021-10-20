import { createAction, props } from '@ngrx/store';
import { Movie } from './movie.model';

export const addMovie = createAction(
  '[Movie List] Add Movie',
  props<{ movieId: string }>()
);

export const removeMovie = createAction(
  '[Movie Collection] Remove Movie',
  props<{ movieId: string }>()
);