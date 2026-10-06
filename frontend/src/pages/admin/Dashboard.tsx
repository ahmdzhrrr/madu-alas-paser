import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../../components/admin/AdminLayout";

import { api }
from "../../services/api";

export default function Dashboard() {

  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {

    api
      .get("/dashboard/stats")
      .then((res) => {

        setStats(
          res.data
        );

      });

  }, []);

  if (!stats) {

    return (
      <AdminLayout>
        Loading...
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500">
            Produk
          </h2>

          <p className="text-4xl font-bold">
            {stats.productCount}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500">
            Kategori
          </h2>

          <p className="text-4xl font-bold">
            {stats.categoryCount}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500">
            Stok Menipis
          </h2>

          <p className="text-4xl font-bold text-red-600">
            {stats.lowStockProducts}
          </p>

        </div>

      </div>

    </AdminLayout>

  );
}