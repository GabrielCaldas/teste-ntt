import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'movie-item',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor() { }

  @Input() movieItem :any = {};
  @Input() isOnFavorite:boolean = false;
  @Output() seeMore = new EventEmitter<any>();
  @Output() changeFavoriteState = new EventEmitter<any>();

  ngOnInit(): void {

  }

  seeMoreClick(){
    this.seeMore.emit(this.movieItem)
  }
  changeFavoriteStateClick(){
    this.changeFavoriteState.emit(this.movieItem.imdbID)
  }

}
