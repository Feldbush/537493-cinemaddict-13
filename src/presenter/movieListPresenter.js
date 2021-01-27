import FilmListView from '../view/filmList';
import UserInfoView from '../view/userInfo';
import MenuView from '../view/menu';
import FilterView from '../view/filter';
import ShowMoreButtonView from '../view/showMoreBtn';
import FilmPresenter from './filmPresenter';

import {render, isEmptyData, remove, updateItem, SortType, getDateDiff, getRatingDiff} from '../utils.js';

import {
  generateFilter
} from '../mock/filter.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const QUANTITY_CARDS_IN_FILMS_LIST = 5;

export default class MovieList {
  constructor(filmsData, comments) {
    this._container = mainElement;
    this._header = headerElement;
    this._filmsData = filmsData.slice();
    this._sourcedFilmsData = filmsData.slice();
    this._comments = comments;
    this._filters = generateFilter(filmsData);

    this._filterView = new FilterView();
    this._filmListView = new FilmListView();
    this._userInfoView = new UserInfoView();
    this._menuView = new MenuView(this._filters);
    this._showMoreButtonView = new ShowMoreButtonView();
    this._filmsCountPerStep = QUANTITY_CARDS_IN_FILMS_LIST;
    this._countFilmsInList = QUANTITY_CARDS_IN_FILMS_LIST;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._handleShowMoreBtn = this._handleShowMoreBtn.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderMenuView();
    if (!isEmptyData(this._filmsData)) {
      this._renderFilter();
      this._renderFilmList();
      this._renderUserInfo();
      this._renderFilms();
    } else {
      this._renderEmptyFilmList();
    }
  }

  _renderMenuView() {
    render(this._container, this._menuView);
  }

  _sortFilmsCards(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._filmsData.sort(getDateDiff);
        break;
      case SortType.RATING:
        this._filmsData.sort(getRatingDiff);
        break;

      default:
        this._filmsData = this._sourcedFilmsData.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilmsCards(sortType);
    this._clearFilmsList();
    this._renderFilms();
  }

  _renderFilter() {
    render(this._container, this._filterView);
    this._filterView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmList() {
    render(this._container, this._filmListView);
    this._renderShowMoreButton();
  }

  _renderEmptyFilmList() {
    this._renderFilmList();
    this._filmListView.emptyListRender();
  }

  _renderUserInfo() {
    render(this._header, this._userInfoView);
  }

  _renderFilmCard(data) {
    const filmPresenter = new FilmPresenter(this._filmListView.getFilmsContainer(), this._handleFilmCardChange, this._handleModeChange);
    filmPresenter.init(data, this._comments);
    this._filmPresenter[data.id] = filmPresenter;
  }

  _renderFilms() {
    for (let index = 0; index < this._filmsCountPerStep; index++) {
      this._renderFilmCard(this._filmsData[index]);
    }
  }

  _clearFilmsList() {
    Object
    .values(this._filmPresenter)
    .forEach((filmPresenter) => {
      filmPresenter.destroy();
    });
    this.filmPresenter = {};
    this._countFilmsInList = QUANTITY_CARDS_IN_FILMS_LIST;
    remove(this._showMoreButtonView);
  }

  _renderShowMoreButton() {
    if (this._filmsData.length > this._countFilmsInList) {
      const showMoreBtn = this._showMoreButtonView.getElement();
      showMoreBtn.addEventListener(`click`, this._handleShowMoreBtn);
      render(this._filmListView.getWrapper(), this._showMoreButtonView);
    }
  }

  _handleShowMoreBtn(evt) {
    evt.preventDefault();
    this._filmsData
      .slice(this._countFilmsInList, this._countFilmsInList + this._filmsCountPerStep)
      .forEach((filmCard) => {
        this._renderFilmCard(filmCard);
      });

    this._countFilmsInList += this._filmsCountPerStep;

    if (this._countFilmsInList >= this._filmsData.length) {
      this._showMoreButtonView.getElement().remove();
    }
  }

  _handleFilmCardChange(updateFilmCard) {
    this._filmsData = updateItem(this._filmsData, updateFilmCard);
    this._filmPresenter[updateFilmCard.id].init(updateFilmCard, this._comments);
  }

  _handleModeChange() {
    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.resetView());
  }
}
