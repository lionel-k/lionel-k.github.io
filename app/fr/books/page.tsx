export default function BooksPage() {
  return (
    <div className="container py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Livres en Français</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Book cards will be populated here */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold">Bientôt Disponible</h2>
          <p className="text-gray-600">
            Notre collection de livres africains bilingues sera bientôt disponible.
          </p>
        </div>
      </div>
    </div>
  );
}