import Component from './component';
import {createElement} from '../utils';

function createFilmListTemplate() {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>
</section>`;
}

export default class FilmList extends Component {
  getTemplate() {
    return createFilmListTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  isEmpty() {
    return this.getContainer().children.length < 1 ? true : false;
  }

  emptyCheck() {
    if (this.isEmpty()) {
      const message = createElement(`<h2 class="films-list__title">There are no movies in our database</h2>`);
      this.getContainer().appendChild(message);
    }
  }
}
