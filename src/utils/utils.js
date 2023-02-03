export const searchMovies = (movies, input) =>
  movies.filter(
    (movie) =>
      (new RegExp(input, "i")).exec(movie.nameRU) ||
      new RegExp(input, "i").exec(movie.nameEN)
  );
