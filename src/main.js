import MovieListPresenter from './presenter/movieListPresenter.js';

import {
  COMMENTS,
  filmsMockData
} from './mock/film';

const movieList = new MovieListPresenter(filmsMockData, COMMENTS);
movieList.init();
