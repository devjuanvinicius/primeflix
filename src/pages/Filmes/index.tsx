import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { APIInterface } from "../Home";
import { toast } from "react-toastify";

import "./filme.scss";

export function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<APIInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "pt-BR",
          },
        })
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    loadMovie();
  }, [id, navigate]);

  function saveFilme() {
    const myList: string | null = localStorage.getItem("@favsList");

    const saveMovies = myList ? JSON.parse(myList) : [];

    const hasMovie = saveMovies.some((moviesSaved: APIInterface) => moviesSaved.id === movie?.id);

    if (hasMovie) {
      toast.warn("Esse filme já está na sua lista");
      return;
    }

    saveMovies.push(movie);
    localStorage.setItem("@favsList", JSON.stringify(saveMovies));
    toast.success("Filme salvo com sucesso");
  }

  if (loading) {
    return (
      <div className="movie-info">
        <h1>Carregando detalhes</h1>
      </div>
    );
  }

  const voteAverage = movie?.vote_average;

  return (
    <div className="movie-info">
      <h1>{movie?.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />

      <h3>Sinopse</h3>
      <span>{movie?.overview}</span>
      <strong>Avaliação: {voteAverage?.toFixed(2)}/10</strong>

      <div className="area-btns">
        <button onClick={saveFilme}>Salvar</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${movie?.title} Trailer`}
            target="blank"
            rel="external"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
