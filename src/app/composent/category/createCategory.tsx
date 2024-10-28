// Component: CreateCategoryForm.tsx
"use client";

import { useState } from "react";
import { CreateCategoryFormProps } from "@/app/interface/categoryFormPropSDTO";


export default function CreateCategoryForm({ categories, onCategoryCreated }: CreateCategoryFormProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const duplicate = categories.some(category => category.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      setError("Une catégorie avec ce nom existe déjà.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la catégorie");
      }

      setSuccess("Catégorie créée avec succès !");
      setName("");
      setDescription("");

      onCategoryCreated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded border">
      <h2 className="text-xl font-bold mb-4">Créer une nouvelle catégorie</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "En cours..." : "Créer la catégorie"}
        </button>
      </form>
    </div>
  );
}
