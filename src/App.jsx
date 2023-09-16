import "./App.css";

function App() {
  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form">
          <input type="text" placeholder="Busca una película" />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        Lista de películas
      </main>
    </div>
  );
}

export default App;
