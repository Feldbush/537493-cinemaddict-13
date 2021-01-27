import Component from './component';
import {SortType} from '../utils';

function createFilterTemplate() {
  return `<ul class="sort">
  <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button">Sort by default</a></li>
  <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
  <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button sort__button--active">Sort by rating</a></li>
</ul>`;
}

export default class FilterView extends Component {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(cb) {
    this._callback.sortTypeChange = cb;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
