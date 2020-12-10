import {
  getRandomInteger
} from '../utils';
import {
  getRandomArrayElement
} from '../utils.js';
import {
  getRandomElementsArray
} from '../utils.js';

const FILMS_NAMES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`];
const POSTERS = [`sagebrush-trail.jpg`, `the-dance-of-life.jpg`, `the-man-with-the-golden-arm.jpg`];
const EMOJI = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];

const COMMENTS = [{
  id: 1,
  content: `WoooooW!`,
  author: `Petya`,
  date: `2 days ago`,
  rank: getRandomInteger(0, 4)
}, {
  id: 2,
  content: `Cooool!`,
  author: `Bob`,
  date: `11 days ago`,
  rank: getRandomInteger(0, 4)
}, {
  id: 3,
  content: `It's amazing!`,
  author: `Gena`,
  date: `14 days ago`,
  rank: getRandomInteger(0, 4)
}, {
  id: 4,
  content: `What i seeeeeees?`,
  author: `Vova`,
  date: `54 days ago`,
  rank: getRandomInteger(0, 4)
}, {
  id: 5,
  content: `Super!`,
  author: `Jack`,
  date: `74 days ago`,
  rank: getRandomInteger(0, 4)
}];

const COMMENTS_ID = [1, 2, 3, 4, 5];
const YEAR_PRODUCTION = [`1997`, `1887`, `2000`];
const DURATION = [`1h 60m`, `2h 00m`, `50m`];
const GENRE = [`Western`, `Musical`, `Comedy`];
const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);
const DIRECTORS = [`Petya Ivanov`, `Vasiliy Pupkin`, `Roman Chepuha`];
const WRITERS = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
const RELEASE_DATE = [`30 March`, `11 March`, `10 March`];
const COUNTRYS = [`USA`, `USSR`, `Brazil`];
const AGES = [18, 16, 6];

function createMockFilmCard() {
  const item = {
    name: getRandomArrayElement(FILMS_NAMES),
    originalName: getRandomArrayElement(FILMS_NAMES),
    rating: getRandomInteger(0, 10),
    poster: getRandomArrayElement(POSTERS),
    comments: Array.from(new Set(getRandomElementsArray(COMMENTS_ID))),
    yearProduction: getRandomArrayElement(YEAR_PRODUCTION),
    duration: getRandomArrayElement(DURATION),
    genres: getRandomElementsArray(GENRE),
    description: getRandomElementsArray(DESCRIPTIONS).join(`,`),
    director: getRandomArrayElement(DIRECTORS),
    writerts: getRandomElementsArray(WRITERS),
    actors: getRandomElementsArray(WRITERS),
    country: getRandomArrayElement(COUNTRYS),
    isInWatchList: Boolean(getRandomInteger(0, 1)),
    isInHistory: Boolean(getRandomInteger(0, 1)),
    isInFavorite: Boolean(getRandomInteger(0, 1)),
    age: getRandomArrayElement(AGES)
  };

  item.releaseDate = getRandomArrayElement(RELEASE_DATE) + ` ` + item.yearProduction;
  return item;
}

const filmsMockData = new Array(15).fill().map((item, index) => createMockFilmCard(index));

export {
  EMOJI,
  COMMENTS,
  filmsMockData,
  createMockFilmCard
};
