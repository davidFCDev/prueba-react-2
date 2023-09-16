import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import responseMovies from "./mocks/results.json";
import { searchMovies } from "./services/movies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("La búsqueda no puede estar vacía");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(false);
  }, [search, isFirstInput]);

  return { search, updateSearch, error };
}

function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async () => {
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const movies = await searchMovies({ search });
      setMovies(movies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  const sortedMovies = sort
    ? [...movies].sort((a, b) => a.year - b.year)
    : movies;

  return { movies: sortedMovies, loading, error, getMovies };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="Busca una película"
          />
          <input onChange={handleSort} type="checkbox" checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
