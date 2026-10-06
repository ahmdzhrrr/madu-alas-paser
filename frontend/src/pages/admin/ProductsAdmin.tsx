import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

export default function ProductsAdmin() {

  const [products, setProducts] =
    useState<any[]>([]);

    

  useEffect(() => {

    loadProducts();
  }, []);

  async function loadProducts() {
    const response =
      await api.get("/products");

    setProducts(response.data);
  }

  async function deleteProduct(
    id: string
  ) {
  
    const confirmDelete =
      confirm(
        "Yakin hapus produk?"
      );
  
    if (!confirmDelete)
      return;
  
    await api.delete(
      `/products/${id}`
    );
  
    loadProducts();
  }

  return (

    <AdminLayout>

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Produk
        </h1>

        <Link
            to="/admin/products/create"
            className="bg-amber-700 text-white px-4 py-2 rounded"
            >
            Tambah Produk
        </Link>

      </div>

      <table className="w-full bg-white">

        <thead>

          <tr>

            <th className="border p-3">
              Nama
            </th>

            <th className="border p-3">
              Harga
            </th>

            <th className="border p-3">
              Stok
            </th>

            <th className="border p-3">
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td className="border p-3">
                {product.name}
              </td>

              <td className="border p-3">
                Rp{" "}
                {Number(product.price)
                  .toLocaleString("id-ID")}
              </td>

              <td className="border p-3">
                {product.stock}
              </td>

              <td className="border p-3">

                <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="mr-3 text-blue-600"
                    >
                    Edit
                </Link>

                <button onClick={() => deleteProduct(product.id)}>
                    Hapus
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </AdminLayout>
  );
}