import {
  getRandomInteger
} from '../utils.js';
import {
  getRandomArrayElement
} from '../utils.js';
import {
  getRandomElementsArray
} from '../utils.js';

const FILMS_NAMES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`];
const POSTERS = [`sagebrush-trail.jpg`, `the-dance-of-life.jpg`, `the-man-with-the-golden-arm.jpg`];
const COMMENTS = [{
  id: 1,
  content: `WoooooW!`
}, {
  id: 2,
  content: `Cooool!`
}, {
  id: 3,
  content: `It's amazing!`
}, {
  id: 4,
  content: `What i seeeeeees?`
}, {
  id: 5,
  content: `Super!`
}];

const COMMENTS_ID = [1, 2, 3, 4, 5];
const YEAR_PRODUCTION = [`1997`, `1887`, `2000`];
const DURATION = [`1h 60m`, `2h 00m`, `50m`];
const GENRE = [`Western`, `Musical`, `Comedy`];
const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);
const DIRECTORS = [`Petya Ivanov`, `Vasiliy Pupkin`, `Roman Chepuha`];
const WRITERS = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
const RELEASE_DATE = [`30 March 1945`, `11 March 1999`, `10 March 2000`];
const COUNTRYS = [`USA`, `USSR`, `Brazil`];

// console.log(getRandomElementsArray(DESCRIPTIONS));
function createMockFilmCard() {
  const item = {
    name: getRandomArrayElement(FILMS_NAMES),
    rating: getRandomInteger(0, 10),
    poster: getRandomArrayElement(POSTERS),
    comments: Array.from(new Set(getRandomElementsArray(COMMENTS_ID))),
    yearProduction: getRandomArrayElement(YEAR_PRODUCTION),
    duration: getRandomArrayElement(DURATION),
    genre: getRandomElementsArray(GENRE),
    description: getRandomElementsArray(DESCRIPTIONS).join(`,`),
    director: getRandomArrayElement(DIRECTORS),
    writerts: getRandomElementsArray(WRITERS),
    actors: getRandomElementsArray(WRITERS),
    releaseDate: getRandomArrayElement(RELEASE_DATE),
    country: getRandomArrayElement(COUNTRYS),
  };
  return item;
}

export {
  createMockFilmCard,
  COMMENTS
};
