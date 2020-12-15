import Component from './component';

function createUserInfoTemplate(rating = `Movie Buff`, avatar = `images/bitmap@2x.png`) {
  return `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
  </section>`;
}

export default class UserInfoView extends Component {
  constructor(rating, avatar) {
    super();
    this._rating = rating;
    this._avatar = avatar;
  }

  getTemplate() {
    return createUserInfoTemplate(this._rating, this._avatar);
  }
}
