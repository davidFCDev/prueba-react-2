function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} />
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResults() {
  return <p>No se han encontrado resultados</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
}
