import { useEffect, useState } from "react";
import { Category } from "@/app/interface/categoryDTO";
import CreateCategoryForm from "./createCategory";

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full w-full gap-8 pb-8"> 
      <div className="flex-1 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Liste des catégories</h2>
        {loading ? (
          <p>Chargement des catégories...</p>
        ) : error ? (
          <p className="text-red-500">Erreur: {error}</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {categories.map((category) => (
              <li key={category.id} className="text-lg">
                <span className="font-semibold">{category.name}</span>
                {category.description && <span>: {category.description}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1 overflow-auto  ">
        <CreateCategoryForm categories={categories} onCategoryCreated={fetchCategories} />
      </div>
    </div>
  );
}
