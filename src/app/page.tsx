import CategoriesList from "../app/composent/category/categoryList";
export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto py-8 px-4 lg:px-16">
          <h2 className="text-3xl font-bold mb-6">Partie admin</h2>
          <CategoriesList />

        </div>
      </div>
    </div>
  );
}
