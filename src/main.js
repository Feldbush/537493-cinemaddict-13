import FilmListView from './view/base-layout';
import FilmCardView from './view/film-card';
import FilmPopUpView from './view/film-details';
import UserInfoView from './view/user-Info';
import MenuView from './view/menu';
import FilterView from './view/filter';
import ShowMoreButtonView from './view/show-more-btn';

import {render} from './utils';

import {COMMENTS, filmsMockData} from './mock/film';
import {generateFilter} from "./mock/filter";

const QUANTITY_CARDS_IN_FILMS_LIST = 5;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const userInfoView = new UserInfoView();
render(headerElement, userInfoView.getElement());


const filters = generateFilter(filmsMockData);
const menuView = new MenuView(filters);
render(mainElement, menuView.getElement());

const filterView = new FilterView();
render(mainElement, filterView.getElement());

const filmListView = new FilmListView();
render(mainElement, filmListView.getElement());

const filmsList = document.querySelector(`.films-list`);

const filmsListContainre = document.querySelector(`.films-list__container`);
function renderFilms() {
  for (let index = 0; index < QUANTITY_CARDS_IN_FILMS_LIST; index++) {
    const filmPopUp = new FilmPopUpView(filmsMockData[index], COMMENTS);
    const filmCard = new FilmCardView(filmsMockData[index]);

    filmCard.setPosterClickHandler((evt) => {
      evt.preventDefault();
      document.body.classList.add(`hide-overflow`);
      render(mainElement, filmPopUp.getElement());
    });

    filmPopUp.setCrossClickHandler((evt) => {
      evt.preventDefault();
      mainElement.removeChild(filmPopUp.getElement());
      document.body.classList.remove(`hide-overflow`);
    });

    render(filmsListContainre, filmCard.getElement());
  }
}

renderFilms();

const showMoreButtonView = new ShowMoreButtonView();
render(filmsList, showMoreButtonView.getElement());

let countFilmsInList = QUANTITY_CARDS_IN_FILMS_LIST;

if (filmsMockData.length > countFilmsInList) {
  const showMoreBtn = filmsList.querySelector(`.films-list__show-more`);
  showMoreBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsMockData
    .slice(countFilmsInList, countFilmsInList + QUANTITY_CARDS_IN_FILMS_LIST)
    .forEach((filmcard) => {
      render(filmsListContainre, new FilmCardView(filmcard).getElement());
    });

    countFilmsInList += QUANTITY_CARDS_IN_FILMS_LIST;

    if (countFilmsInList >= filmsMockData.length) {
      showMoreBtn.remove();
    }
  });
}
