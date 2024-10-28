"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/app/interface/movieDTO";

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const moviesPerPage = 10; // Nombre de films par page

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des films</h2>
      {loading ? (
        <p>Chargement des films...</p>
      ) : error ? (
        <p className="text-red-500">Erreur: {error}</p>
      ) : (
        <>
          <div className="space-y-8">
            {currentMovies.map((movie) => (
              <div key={movie.id} className="border-b border-gray-300 pb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.original_name} poster`}
                    className="w-20 h-30 object-cover rounded"
                  />
                  <div>
                    <span className="font-semibold text-xl">{movie.original_name}</span>
                    <p className="text-sm text-gray-700 mb-2">{movie.overview}</p>
                    <p className="text-sm text-gray-500">Date de sortie: {movie.first_air_date}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      Note: {movie.vote_average} ({movie.vote_count} votes)
                    </p>
                    <p className="text-sm text-gray-500">
                      Catégories:{" "}
                      {movie.categories.map((category, index) => (
                        <span key={category.id}>
                          {category.name}
                          {index < movie.categories.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Précédent
            </button>
            <span className="text-gray-700">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}