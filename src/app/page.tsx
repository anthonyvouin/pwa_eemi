"use client";

import { useState } from "react";
import CategoriesList from "./composent/category/categoryList";
import MoviesList from "./composent/movies/moviesList";
export default function Tabs() {
  // Utilisation du state pour déterminer l'onglet actif
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 font-semibold ${activeTab === "categories" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
        >
          Catégories
        </button>
        <button
          onClick={() => setActiveTab("movies")}
          className={`px-4 py-2 font-semibold ${activeTab === "movies" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
        >
          Films
        </button>
      </div>

            {activeTab === "categories" ? <CategoriesList /> : <MoviesList />}


    </div>
  );
}
