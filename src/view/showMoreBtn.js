import Component from './component';

function createShowMoreBtnTemplate() {
  return `<button class="films-list__show-more">Show more</button>`;
}

export {createShowMoreBtnTemplate};

export default class ShowMoreButtonView extends Component {
  constructor() {
    super();
  }

  getTemplate() {
    return createShowMoreBtnTemplate();
  }
}

