
const filmTofilterMap = {
  'All movies': (films) => films.length,
  'WatchList': (films) => films.filter((film) => film.isInWatchList).length,
  'History': (films) => films.filter((film) => film.isInHistory).length,
  'Favorite': (films) => films.filter((film) => film.isInFavorite).length
};

export function generateFilter(films) {
  return Object.entries(filmTofilterMap).map(([filterName, countFilter]) => {
    return {
      name: filterName,
      count: countFilter(films)
    };
  });
}
