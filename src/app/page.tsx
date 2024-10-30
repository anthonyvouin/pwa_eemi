"use client";

import React, {useState} from "react";
import CategoriesList from "@/src/app/composent/category/categoryList";
import MoviesList from "@/src/app/composent/movies/moviesList";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className="w-[90%] mx-auto mt-4">
      <div className="flex border-b pb-2 mb-4">
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "categories" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
          }`}
        >
          Catégories
        </button>
        <button
          onClick={() => setActiveTab("movies")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "movies" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
          }`}
        >
          Films
        </button>
      </div>

      <div>
        {activeTab === "categories" ? <CategoriesList /> : <MoviesList />}
      </div>

    </div>
  );
}
