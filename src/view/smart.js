import Component from './component';

export default class Smart extends Component {
  constructor() {
    super();
  }

  restoreHandlers() {
    throw new Error(`Smart method not implemented: restoreHandlers`);
  }

  _restoreScroll() {
    this.getElement().scrollTop = this._scrollTop;
  }

  updateElement() {
    this._scrollTop = this.getElement().scrollTop;

    const parent = this.getElement().parentElement;
    let prevElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this._restoreScroll();

    this.restoreHandlers();
  }

  updateState(update, justUpdate) {
    if (!update) {
      return;
    }

    this._state = Object.assign(
        {},
        this._state,
        update
    );

    if (justUpdate) {
      return;
    }

    this.updateElement();
  }

}
