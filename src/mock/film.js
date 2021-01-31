import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomElementsArray,
  getRandomDate,
  generateId
} from '../utils';

const FILMS_NAMES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`];
const POSTERS = [`sagebrush-trail.jpg`, `the-dance-of-life.jpg`, `the-man-with-the-golden-arm.jpg`];
const emojiNames = [`angry`, `puke`, `sleeping`, `smile`];
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
  date: getRandomDate(),
  emotion: getRandomArrayElement(emojiNames)
}, {
  id: 2,
  content: `Cooool!`,
  author: `Bob`,
  date: getRandomDate(),
  emotion: getRandomArrayElement(emojiNames)
}, {
  id: 3,
  content: `It's amazing!`,
  author: `Gena`,
  date: getRandomDate(),
  emotion: getRandomArrayElement(emojiNames)
}, {
  id: 4,
  content: `What i seeeeeees?`,
  author: `Vova`,
  date: getRandomDate(),
  emotion: getRandomArrayElement(emojiNames)
}, {
  id: 5,
  content: `Super!`,
  author: `Jack`,
  date: getRandomDate(),
  emotion: getRandomArrayElement(emojiNames)
}];

const COMMENTS_ID = [1, 2, 3, 4, 5];
const DURATION = [`1h 60m`, `2h 00m`, `50m`];
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
    duration: getRandomArrayElement(DURATION),
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

  item.releaseDate = getRandomDate();
  item.yearProduction = item.releaseDate.year();

  return item;
}

const filmsMockData = new Array(15).fill().map((item, index) => createMockFilmCard(index));

export {
  Emoji,
  COMMENTS,
  filmsMockData,
  createMockFilmCard
};
