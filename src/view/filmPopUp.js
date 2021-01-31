import {Emoji} from '../mock/film';
import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
import relativeTime from 'dayjs/plugin/relativeTime';
import {createElement, getRunTimeInformat} from '../utils';
import Smart from './smart';

dayjs.extend(relativeTime);
dayjs.extend(duration);

function createFilmPopUpViewTemplate(data, commentsFull) {
  const {
    name,
    originalName,
    rating,
    poster,
    comments,
    runtime,
    genres,
    description,
    director,
    writers,
    actors,
    release,
    minAge,
    isInWatchList,
    isInHistory,
    isInFavorite
  } = data;

  if (!name) {
    return ``;
  }

  let genresList = genres.reduce((prev, item) => {
    return `${prev} <span class="film-details__genres">${item}</span>`;
  }, ``);

  function getCommentTemplate(author, comment, date, emotion) {
    let content = `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${Emoji[emotion]}" width="55" height="55" alt="emoji-sleeping">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(date).format(`YYYY/MM/D H:mm`)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
    </li>`;

    return content;
  }

  let filteredComments = commentsFull
    .filter((item) => {
      return comments.includes(item.id);
    });

  let commentsTemplate = filteredComments.reduce((accumulator, commentItem) => {
    const {author, content, date, emotion} = commentItem;
    let result = `${accumulator} ${getCommentTemplate(author, content, date, emotion)}`;
    return result;
  }, ``);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${minAge}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${name}</h3>
              <p class="film-details__title-original">Original: ${originalName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.length > 1 ? writers.join(`, `) : writers.join(``)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.length > 1 ? actors.join(`, `) : actors.join(``)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(release.date).format(`D MMMM YYYY`)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getRunTimeInformat(runtime).hours} h ${getRunTimeInformat(runtime).minutes > 0 ? (getRunTimeInformat(runtime).minutes) + ` mm` : ``}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
              ${genresList}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchList ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isInHistory ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isInFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
          ${commentsTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
}

export default class FilmPopUpView extends Smart {
  constructor(filmData, commentsFull) {
    super();
    this._data = filmData;
    this._state = FilmPopUpView.parseFilmDataToState(this._data);
    this._comments = commentsFull;
    this._crossClickHandler = this._crossClickHandler.bind(this);

    this._handlerAddWatchListToggle = this._handlerAddWatchListToggle.bind(this);
    this._handlerAddHistoryToggle = this._handlerAddHistoryToggle.bind(this);
    this._handlerAddFavoriteToggle = this._handlerAddFavoriteToggle.bind(this);
    this._emotionChoiceHandler = this._emotionChoiceHandler.bind(this);
    this._chooseEmotion = this._chooseEmotion.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmPopUpViewTemplate(this._state, this._comments);
  }

  _crossClickHandler(evt) {
    this._callback.crossClick(evt);
  }

  setCrossClickHandler(cb) {
    this._callback.crossClick = cb;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._crossClickHandler);
  }

  _handlerAddWatchListToggle(evt) {
    evt.preventDefault();
    this.updateState({isInWatchList: !this._state.isInWatchList});
  }

  _handlerAddHistoryToggle(evt) {
    evt.preventDefault();
    this.updateState({isInHistory: !this._state.isInHistory});
  }

  _handlerAddFavoriteToggle(evt) {
    evt.preventDefault();
    this.updateState({isInFavorite: !this._state.isInFavorite});
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._handlerAddWatchListToggle);
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._handlerAddHistoryToggle);
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._handlerAddFavoriteToggle);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._emotionChoiceHandler);
  }

  _chooseEmotion(emotionName) {
    const currentEmotionRadioInput = this.getElement().querySelector(`.film-details__emoji-list #emoji-${emotionName}`);
    currentEmotionRadioInput.setAttribute(`checked`, true);
    const field = this.getElement().querySelector(`.film-details__add-emoji-label`);
    if (field.children.length > 0) {
      field.innerHtml = ``;
    }
    const emotion = createElement(`<img src="images/emoji/${emotionName}.png" width="55" height="55" alt="emoji-${emotionName}">`);
    field.append(emotion);
  }

  _emotionChoiceHandler(evt) {
    let selectEmotionValue = evt.target.value;
    if (typeof evt.target.value === `string`) {
      this.updateState({emotion: evt.target.value});
      this._chooseEmotion(selectEmotionValue);
    }
  }

  getData() {
    return FilmPopUpView.parseStateToFilmData(this._state);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCrossClickHandler(this._callback.crossClick);
  }

  static parseFilmDataToState(filmData) {
    return Object.assign(
        {},
        filmData
    );
  }

  static parseStateToFilmData(state) {
    return Object.assign(
        {},
        state
    );
  }
}
