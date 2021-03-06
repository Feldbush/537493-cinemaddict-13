import Component from './component';

function createMenuTemplate(data) {
  const filtersTemplate = data.map((item, index) => {
    return `<a href="#${item.name}" class="main-navigation__item ${index === 0 ? `main-navigation__item--active` : ``}">${item.name} ${item.name === `All movies` ? `` : `<span class="main-navigation__item-count">${item.count}</span>`}</a>`;
  }).join(``);

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filtersTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
}

export default class MenuView extends Component {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createMenuTemplate(this._data);
  }
}
