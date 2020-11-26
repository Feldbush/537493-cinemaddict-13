import {createUserInfoTemplate} from './view/user-Info';
import {createMenuTemplate} from './view/menu';
import {createFilterTemplate} from './view/filter';
import {createFilmCardTemplate} from './view/film-card';
import {createShowMoreBtnTemplate} from './view/show-more-btn';
import {createFilmDetailsTemplate} from './view/film-details';
import {createBaseLayoutTemplate} from './view/base-layout';

const QUANTITY_CARDS_IN_FILMS_LIST = 5;
const QUANTITY_CARDS_IN_CATHEGORY_LIST = 2;

function render(container, content, place = `beforeend`) {
  container.insertAdjacentHTML(place, content);
}

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, createUserInfoTemplate());
render(mainElement, createMenuTemplate());
render(mainElement, createFilterTemplate());
render(mainElement, createBaseLayoutTemplate());

const filmsList = document.querySelector(`.films-list`);
const filmsListContainre = filmsList.querySelector(`.films-list__container`);

for (let index = 0; index < QUANTITY_CARDS_IN_FILMS_LIST; index++) {
  render(filmsListContainre, createFilmCardTemplate());
}
render(filmsListContainre, createShowMoreBtnTemplate(), `afterend`);

const cathegoryListsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);
cathegoryListsContainers.forEach((list) => {
  for (let index = 0; index < QUANTITY_CARDS_IN_CATHEGORY_LIST; index++) {
    render(list, createFilmCardTemplate());
  }
});

render(footerElement, createFilmDetailsTemplate(), `afterend`);
