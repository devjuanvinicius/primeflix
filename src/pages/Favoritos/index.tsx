import "./favoritos.scss";

import { useEffect, useState } from "react";
import { APIInterface } from "../Home";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export function Favoritos() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList: string | null = localStorage.getItem("@favsList");
    setMovies(myList ? JSON.parse(myList) : []);
  }, []);

  function handleDeleteMovie(movieID: number) {
    const movieListFilter = movies.filter((movies: APIInterface) => {
      return movies.id !== movieID;
    });

    setMovies(movieListFilter);
    localStorage.setItem("@favsList", JSON.stringify(movieListFilter));
    toast.success("Filme removido com sucesso!");
  }

  return (
    <div className="my-movies">
      <h1>Meus filmes</h1>

      {movies.length === 0 && <span>Voce nao possui nenhum filme salvo!</span>}

      <ul>
        {movies.map((movie: APIInterface) => {
          return (
            <li key={movie.id}>
              <div className="poster-movie">
                <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt="" />
                <div className="txts">
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                </div>
              </div>
              <div className="details">
                <Link to={`/filmes/${movie.id}`}>Ver detalhes</Link>
                <button onClick={() => handleDeleteMovie(movie?.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
