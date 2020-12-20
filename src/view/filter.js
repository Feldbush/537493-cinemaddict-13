import Component from './component';

function createFilterTemplate() {
  return `<ul class="sort">
  <li><a href="#" class="sort__button">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
</ul>`;
}

export default class FilterView extends Component {
  constructor() {
    super();
  }

  getTemplate() {
    return createFilterTemplate();
  }
}
