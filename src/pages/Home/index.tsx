import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

import "./home.scss";

export interface APIInterface {
  id: number;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  title: string;
  vote_average?: number;
}

export function Home() {
  const [movies, setMovies] = useState<APIInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response: AxiosResponse = await api.get("movie/now_playing", {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "pt-BR",
          page: 1,
        },
      });

      setMovies(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="movie-list">
        {movies.map((movie) => {
          return (
            <article key={movie.id}>
              <h2>{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <Link to={`/filmes/${movie.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
