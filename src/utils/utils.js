export const searchMovies = (movies, input) =>
  movies.filter(
    (movie) =>
      (new RegExp(input, "i")).exec(movie.nameRU) ||
      new RegExp(input, "i").exec(movie.nameEN)
  );

export const getShortMovieTime = (duration) => `${Math.floor(duration/60)}ч${duration%60}м`;