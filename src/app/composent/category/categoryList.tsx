"use client"

import { useEffect, useState } from "react";
import { Category } from "@/app/interface/categoryDTO";
export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("API_BASE_URL:", API_BASE_URL);

        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [API_BASE_URL]);

  if (loading) return <p>Chargement des catégories...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des catégories</h2>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <span className="font-semibold">{category.name}</span>
            {category.description && <span>: {category.description}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}