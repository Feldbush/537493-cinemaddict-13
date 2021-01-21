import FilmListView from './view/filmList';
import FilmCardView from './view/film-card';
import FilmPopUpView from './view/film-details';
import UserInfoView from './view/user-Info';
import MenuView from './view/menu';
import FilterView from './view/filter';
import ShowMoreButtonView from './view/show-more-btn';

import {render, isEmptyData} from './utils';

import {COMMENTS, filmsMockData} from './mock/film';
import {generateFilter} from "./mock/filter";

const QUANTITY_CARDS_IN_FILMS_LIST = 5;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filters = generateFilter(filmsMockData);
const menuView = new MenuView(filters);
render(mainElement, menuView.getElement());

if (isEmptyData(filmsMockData)) {
  const filterView = new FilterView();
  render(mainElement, filterView.getElement());
}

const filmListView = new FilmListView();
render(mainElement, filmListView.getElement());

if (isEmptyData(filmsMockData)) {
  const userInfoView = new UserInfoView();
  render(headerElement, userInfoView.getElement());

  const filmsList = document.querySelector(`.films-list`);

  const filmsListContainer = document.querySelector(`.films-list__container`);

  const filmPopUp = new FilmPopUpView({}, COMMENTS);
  filmPopUp.getElement();

  const renderFilmCard = function (data) {
    const filmCard = new FilmCardView(data);

    filmCard.setPosterClickHandler((evt) => {
      evt.preventDefault();
      document.body.classList.add(`hide-overflow`);

      const backdrop = document.createElement(`div`);
      backdrop.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: auto;
      z-index: 1;
    `;
      document.body.append(backdrop);

      filmPopUp.updateElement(filmCard._data);
      filmPopUp.setCrossClickHandler((e) => {
        e.preventDefault();
        mainElement.removeChild(filmPopUp.getElement());
        document.body.classList.remove(`hide-overflow`);
        document.body.removeChild(backdrop);
      });
      render(mainElement, filmPopUp.getElement());
    });

    render(filmsListContainer, filmCard.getElement());
  };

  const renderFilms = function () {
    for (let index = 0; index < QUANTITY_CARDS_IN_FILMS_LIST; index++) {
      renderFilmCard(filmsMockData[index]);
    }
  };

  renderFilms();

  const showMoreButtonView = new ShowMoreButtonView();
  render(filmsList, showMoreButtonView.getElement());

  let countFilmsInList = QUANTITY_CARDS_IN_FILMS_LIST;

  if (filmsMockData.length > countFilmsInList) {
    const showMoreBtn = showMoreButtonView.getElement();
    showMoreBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filmsMockData
        .slice(countFilmsInList, countFilmsInList + QUANTITY_CARDS_IN_FILMS_LIST)
        .forEach((filmCard) => {
          renderFilmCard(filmCard);
        });

      countFilmsInList += QUANTITY_CARDS_IN_FILMS_LIST;

      if (countFilmsInList >= filmsMockData.length) {
        showMoreBtn.remove();
      }
    });
  }
}

filmListView.isEmptyCheck();
