import { Movie } from './movie.model';

export interface AppState {
  movies: Array<Movie>;
  collection: ReadonlyArray<string>;
}