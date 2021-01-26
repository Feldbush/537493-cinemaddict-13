import {
  render,
  replace,
  remove
} from '../utils.js';
import FilmCardView from '../view/filmCard.js';
import FilmPopUpView from '../view/filmPopUp';

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class FilmPresenter {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmPopUp = null;
    this._mode = Mode.DEFAULT;

    this._closeFilmPopUpHandler = this._closeFilmPopUpHandler.bind(this);
    this._openFilmPopUpHandler = this._openFilmPopUpHandler.bind(this);

    this._handleAddWatchListClick = this._handleAddWatchListClick.bind(this);
    this._handleAddWatchedListClick = this._handleAddWatchedListClick.bind(this);
    this._handleAddFavoriteClick = this._handleAddFavoriteClick.bind(this);
  }

  init(data, comments) {
    this._data = data;
    this._comments = comments;

    const prevFilmComponent = this._filmComponent;
    const prevFilmPopUp = this._filmPopUp;

    this._filmComponent = new FilmCardView(this._data);
    this._filmPopUp = new FilmPopUpView(this._data, this._comments);
    this._backdrop = null;

    this._filmComponent.setPosterClickHandler(this._openFilmPopUpHandler);
    this._filmComponent.setHandleAddWatchListClick(this._handleAddWatchListClick);
    this._filmComponent.setHandleAddWatchedListClick(this._handleAddWatchedListClick);
    this._filmComponent.setHandleAddFavoriteClick(this._handleAddFavoriteClick);

    this._filmPopUp.setHandleAddWatchListClick(this._handleAddWatchListClick);
    this._filmPopUp.setHandleAddWatchedListClick(this._handleAddWatchedListClick);
    this._filmPopUp.setHandleAddFavoriteClick(this._handleAddFavoriteClick);

    this._filmPopUp.setCrossClickHandler(this._closeFilmPopUpHandler);

    if (prevFilmComponent === null || prevFilmPopUp === null) {
      render(this._container, this._filmComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._filmPopUp, prevFilmPopUp);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopUp);
  }

  _openFilmPopUpHandler(evt) {
    evt.preventDefault();
    document.body.classList.add(`hide-overflow`);

    this._backdrop = document.createElement(`div`);
    this._backdrop.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: auto;
    z-index: 1;
  `;
    document.body.append(this._backdrop);

    this._filmPopUp.updateElement(this._data);

    this._filmPopUp.setCrossClickHandler(this._closeFilmPopUpHandler);
    this._filmPopUp.setEscKeyPressHandler(this._closeFilmPopUpHandler);

    // this._filmPopUp.setHandleAddWatchListClick(this._handleAddWatchListClick);
    // this._filmPopUp.setHandleAddWatchedListClick(this._handleAddWatchedListClick);
    // this._filmPopUp.setHandleAddFavoriteClick(this._handleAddFavoriteClick);

    this._changeMode();
    this._mode = Mode.POPUP;

    render(this._container, this._filmPopUp);
  }

  _closeFilmPopUp() {
    this._container.removeChild(this._filmPopUp.getElement());
    document.body.classList.remove(`hide-overflow`);
    document.body.removeChild(this._backdrop);
    this._filmPopUp.removeEscKeyPressHandler();
    this._mode = Mode.DEFAULT;
  }

  _closeFilmPopUpHandler(evt) {
    evt.preventDefault();
    this._closeFilmPopUp();
  }

  _handleAddWatchListClick() {
    this._changeData(Object.assign(
        {},
        this._data,
        {isInWatchList: !this._data.isInWatchList}
    ));
  }

  _handleAddWatchedListClick() {
    this._changeData(Object.assign(
        {},
        this._data,
        {isInHistory: !this._data.isInHistory}
    ));
  }

  _handleAddFavoriteClick() {
    this._changeData(Object.assign(
        {},
        this._data,
        {isInFavorite: !this._data.isInFavorite}
    ));
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopUp);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT && this._container.contains(this._filmPopUp.getElement())) {
      this._closeFilmPopUp();
    }
  }
}
