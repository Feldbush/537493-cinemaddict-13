import {createElement, isEmptyData} from '../utils';
import Component from './component';

function createBaseLayoutTemplate() {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>
</section>`;
}


export default class FilmList extends Component {
  getTemplate() {
    return createBaseLayoutTemplate();
  }

  isEmptyCheck(data) {
    if (isEmptyData(data)) {
      let mockTitle = createElement(`<h2 class="films-list__title">There are no movies in our database</h2>`);
      this.getElement().querySelector(`.films-list`).append(mockTitle);
    }
  }
}
