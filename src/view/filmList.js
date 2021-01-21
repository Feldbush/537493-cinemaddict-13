import {createElement} from '../utils';
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

  isEmptyCheck() {
    if (this.getElement().querySelector(`.films-list__container`).children.length < 1) {
      let mockTitle = createElement(`<h2 class="films-list__title">There are no movies in our database</h2>`);
      this.getElement().querySelector(`.films-list`).append(mockTitle);
    }
  }
}
