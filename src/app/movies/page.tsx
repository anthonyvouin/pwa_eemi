"use client";

import { useEffect, useState } from "react";
import { Category } from "../interface/categoryDTO";
import { MovieCreateDTO } from "../interface/movieCreateDTO";
import {useRouter} from "next/navigation";
export default function MovieForm() {

  const router = useRouter();
  const [movieData, setMovieData] = useState<MovieCreateDTO>({
    original_name: "",
    overview: "",
    original_language: "",
    origin_country: [""],
    first_air_date: "",
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    adult: false,
    backdrop_path: "",
    poster_path: "",
    categories: [],
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) throw new Error("Error fetching categories");
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedOriginCountry = [...movieData.origin_country];
    updatedOriginCountry[index] = value;
    setMovieData((prevData) => ({
      ...prevData,
      origin_country: updatedOriginCountry,
    }));
  };

  const addOriginCountry = () => {
    setMovieData((prevData) => ({
      ...prevData,
      origin_country: [...prevData.origin_country, ""],
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
    setMovieData((prevData) => ({
      ...prevData,
      categories: selectedOptions,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });
      if (response.ok) {
        alert("Film ajouté avec succès !");
        router.push("/");
      } else {
        throw new Error("Erreur lors de l'ajout du film.");
      }
    } catch (error) {
      alert(`Erreur: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">Ajouter un nouveau film</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Nom original</label>
          <input
            type="text"
            name="original_name"
            value={movieData.original_name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Nom du film"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="overview"
            value={movieData.overview}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Aperçu du film"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Langue originale</label>
          <input
            type="text"
            name="original_language"
            value={movieData.original_language}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Langue (ex: fr, en)"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Pays d'origine</label>
          {movieData.origin_country.map((country, index) => (
            <input
              key={index}
              type="text"
              value={country}
              onChange={(e) => handleArrayChange(e, index)}
              className="border border-gray-300 p-2 rounded w-full mb-2"
              placeholder="Code pays (ex: JP)"
            />
          ))}
          <button
            type="button"
            onClick={addOriginCountry}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ajouter un pays d'origine
          </button>
        </div>

        <div>
          <label className="block font-semibold mb-1">Date de première diffusion</label>
          <input
            type="date"
            name="first_air_date"
            value={movieData.first_air_date}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-1">Note moyenne</label>
            <input
              type="number"
              name="vote_average"
              value={movieData.vote_average}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              min="0"
              max="10"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Nombre de votes</label>
            <input
              type="number"
              name="vote_count"
              value={movieData.vote_count}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Popularité</label>
            <input
              type="number"
              name="popularity"
              value={movieData.popularity}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Contenu adulte</label>
          <input
            type="checkbox"
            name="adult"
            checked={movieData.adult}
            onChange={handleChange}
            className="mr-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image 1</label>
          <input
            type="text"
            name="backdrop_path"
            value={movieData.backdrop_path}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image 2</label>
          <input
            type="text"
            name="poster_path"
            value={movieData.poster_path }
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Catégories</label>
          {loadingCategories ? (
            <p>Chargement des catégories...</p>
          ) : error ? (
            <p className="text-red-500">Erreur: {error}</p>
          ) : (
            <select
              multiple
              name="categories"
              value={movieData.categories}
              onChange={handleCategoryChange}
              className="border p-2 w-full rounded"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4">
        Ajouter le film
      </button>
    </form>
  );
}