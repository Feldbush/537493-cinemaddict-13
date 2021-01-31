import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomElementsArray,
  generateId
} from '../utils';

const FILMS_NAMES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`];
const POSTERS = [`sagebrush-trail.jpg`, `the-dance-of-life.jpg`, `the-man-with-the-golden-arm.jpg`];
const Emoji = {
  angry: `angry.png`,
  puke: `puke.png`,
  sleeping: `sleeping.png`,
  smile: `smile.png`
};

const COMMENTS = [{
  id: 1,
  content: `WoooooW!`,
  author: `Petya`,
  date: `2019-05-11T16:12:32.554Z`,
  emotion: getRandomArrayElement(Object.keys(Emoji))
}, {
  id: 2,
  content: `Cooool!`,
  author: `Bob`,
  date: `2019-05-11T16:12:32.554Z`,
  emotion: getRandomArrayElement(Object.keys(Emoji))
}, {
  id: 3,
  content: `It's amazing!`,
  author: `Gena`,
  date: `2019-05-11T16:12:32.554Z`,
  emotion: getRandomArrayElement(Object.keys(Emoji))
}, {
  id: 4,
  content: `What i seeeeeees?`,
  author: `Vova`,
  date: `2019-05-11T16:12:32.554Z`,
  emotion: getRandomArrayElement(Object.keys(Emoji))
}, {
  id: 5,
  content: `Super!`,
  author: `Jack`,
  date: `2019-05-11T16:12:32.554Z`,
  emotion: getRandomArrayElement(Object.keys(Emoji))
}];

const COMMENTS_ID = [1, 2, 3, 4, 5];
const RUNTIME = [80, 120, 60];
const GENRE = [`Western`, `Musical`, `Comedy`];
const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);
const DIRECTORS = [`Petya Ivanov`, `Vasiliy Pupkin`, `Roman Chepuha`];
const WRITERS = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
const COUNTRYS = [`USA`, `USSR`, `Brazil`];
const AGES = [18, 16, 6];

function createMockFilmCard() {
  const item = {
    id: generateId(),
    name: getRandomArrayElement(FILMS_NAMES),
    originalName: getRandomArrayElement(FILMS_NAMES),
    rating: getRandomInteger(0, 10),
    poster: getRandomArrayElement(POSTERS),
    comments: Array.from(new Set(getRandomElementsArray(COMMENTS_ID))),
    runtime: getRandomArrayElement(RUNTIME),
    genres: getRandomElementsArray(GENRE),
    description: getRandomElementsArray(DESCRIPTIONS).join(`,`),
    director: getRandomArrayElement(DIRECTORS),
    writers: getRandomElementsArray(WRITERS),
    actors: getRandomElementsArray(WRITERS),
    country: getRandomArrayElement(COUNTRYS),
    isInWatchList: Boolean(getRandomInteger(0, 1)),
    isInHistory: Boolean(getRandomInteger(0, 1)),
    isInFavorite: Boolean(getRandomInteger(0, 1)),
    minAge: getRandomArrayElement(AGES)
  };

  item.release = {
    date: `2019-05-11T00:00:00.000Z`,
    release_country: getRandomArrayElement(COUNTRYS)
  };

  return item;
}

const filmsMockData = new Array(15).fill().map((item, index) => createMockFilmCard(index));

export {
  Emoji,
  COMMENTS,
  filmsMockData,
  createMockFilmCard
};
