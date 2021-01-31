import dayjs from 'dayjs';
import Component from './component';
import {getRunTimeInformat} from '../utils';

function createFilmCardViewTemplate(data) {
  const {
    name,
    rating,
    poster,
    comments,
    release,
    runtime,
    genres,
    description,
    isInWatchList,
    isInHistory,
    isInFavorite
  } = data;
  return `<article class="film-card">
  <h3 class="film-card__title">${name}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(release.date).format(`YYYY`)}</span>
    <span class="film-card__duration">${getRunTimeInformat(runtime).hours} h ${getRunTimeInformat(runtime).minutes > 0 ? (getRunTimeInformat(runtime).minutes) + ` mm` : ``}</span>
    <span class="film-card__genre">${genres[0]}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${comments.length} ${comments.length > 1 ? `comments` : `comment`}</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchList ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isInHistory ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isInFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
  </div>
</article>`;
}

export default class FilmCardView extends Component {
  constructor(filmData) {
    super();
    this._data = filmData;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._handleAddWatchListClick = this._handleAddWatchListClick.bind(this);
    this._handleAddWatchedListClick = this._handleAddWatchedListClick.bind(this);
    this._handleAddFavoriteClick = this._handleAddFavoriteClick.bind(this);
  }

  getTemplate() {
    return createFilmCardViewTemplate(this._data);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick(evt);
  }

  setPosterClickHandler(cb) {
    this._callback.posterClick = cb;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._posterClickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._posterClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._posterClickHandler);
  }

  _handleAddWatchListClick(evt) {
    evt.preventDefault();
    this._callback.addWatchListClick(evt);
  }

  setHandleAddWatchListClick(cb) {
    this._callback.addWatchListClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._handleAddWatchListClick);
  }

  _handleAddWatchedListClick(evt) {
    evt.preventDefault();
    this._callback.addWatchedListClick(evt);
  }

  setHandleAddWatchedListClick(cb) {
    this._callback.addWatchedListClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._handleAddWatchedListClick);
  }

  _handleAddFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.addFavoriteClick(evt);
  }

  setHandleAddFavoriteClick(cb) {
    this._callback.addFavoriteClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._handleAddFavoriteClick);
  }
}
