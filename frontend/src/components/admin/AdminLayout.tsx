import { Link, useNavigate } from "react-router-dom";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem(
      "token"
    );

    navigate(
      "/admin/login"
    );

  }

  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-amber-700 text-white flex flex-col">

        <div className="p-6 text-xl font-bold">
          Admin Panel
        </div>

        <nav className="flex flex-col flex-1">

          <Link
            to="/admin/dashboard"
            className="p-4 hover:bg-amber-800"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="p-4 hover:bg-amber-800"
          >
            Produk
          </Link>

          <Link
            to="/admin/categories"
            className="p-4 hover:bg-amber-800"
          >
            Kategori
          </Link>

          <Link
            to="/admin/settings"
            className="p-4 hover:bg-amber-800"
          >
            Pengaturan
          </Link>

          <Link
            to="/admin/carousel"
            className="p-4 hover:bg-amber-800"
          >
            Carousel
          </Link>

          <button
            onClick={logout}
            className="mt-auto p-4 text-left hover:bg-red-700"
          >
            Logout
          </button>

        </nav>

      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>

    </div>
  );
}