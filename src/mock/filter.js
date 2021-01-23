import {isEmptyData} from '../utils.js';

const filmTofilterMap = {
  'All movies': (films) => films.length,
  'WatchList': (films) => films.filter((film) => film.isInWatchList).length,
  'History': (films) => films.filter((film) => film.isInHistory).length,
  'Favorite': (films) => films.filter((film) => film.isInFavorite).length
};

export function generateFilter(films) {
  if (isEmptyData(films)) {
    films = [];
  }

  const result = Object.entries(filmTofilterMap).map(([filterName, countFilter]) => {
    return {
      name: filterName,
      count: countFilter(films)
    };
  });

  return result;
}
