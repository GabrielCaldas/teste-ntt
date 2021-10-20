import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import {
  addMovie,
  removeMovie,
} from './state/favorite-list.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // States
  readonly homeState = 0;
  readonly searchState = 1;
  readonly detailMovieState = 2;
  readonly favoriteState = 3;

  // Constants Variables
  readonly appIcon = "https://uxwing.com/wp-content/themes/uxwing/download/32-video-photography-multimedia/film-movie.svg";
  readonly hostAPI = "https://www.omdbapi.com/?apikey=e5f5da35&plot=full"
  readonly title = "Movie Time"

  // Variables
  state = this.homeState;
  movieList : Array<any> = []
  selectedMovie :any = null;
  searchTerm = "";

  
  constructor(
    private store: Store,
    private http: HttpClient
  ) {

  }

  // Functions
  goToHome(){
    this.state = 0;
    this.selectedMovie = null;
  }

  async searchMovie(){

    const obj = await this.getMovie('t',this.searchTerm);

    if(!obj.Error){
      this.selectedMovie = obj;
    }
    else{
      this.selectedMovie = null;
    }
    this.state = this.searchState;
  }

  detailMovie(movie:any){
    this.selectedMovie = movie;
    this.state = this.detailMovieState;
  }

  isOnFavorite(movieId:string){
    let favoriteList : Array<string>;
    favoriteList = this.getFavoriteList();

    return favoriteList.includes(movieId);

  }

  getFavoriteList() : Array<string>{
    let state : Array<string> = [];
    this.store.select("collection").pipe().subscribe(
      (s:any) => state = s
   );
   
   return state;
  }

  changeFavoriteState(movieId:string){
    if(this.isOnFavorite(movieId)){
      this.store.dispatch(removeMovie({ movieId }));
    }
    else{
      this.store.dispatch(addMovie({ movieId }));
    }
    this.loadFavoriteList()
  }

  async openFavoriteList(){
    await this.loadFavoriteList();
    this.state = this.favoriteState;
  }

  async loadFavoriteList(){
    var favorites = this.getFavoriteList();
    this.movieList = [];
    await favorites.map(async movieID => {
      const obj = await this.getMovie('i',movieID);

      if(!obj.Error){
        this.movieList.push(obj)
      }

    })
  }

  async getMovie(param:string,searchTerm:string){

    const url=this.hostAPI+'&'+param+'='+searchTerm;
    return this.http.get<any>(url).toPromise().then(r => {return r});
  }
}