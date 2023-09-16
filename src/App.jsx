import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import responseMovies from "./mocks/results.json";

function App() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);
  const movies = responseMovies.Search;

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

  const mappedMovies = movies.map((movie) => {
    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Buscando", search);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
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
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>

      <main>
        {loading ? <p>Loading...</p> : <Movies movies={mappedMovies} />}
      </main>
    </div>
  );
}

export default App;
