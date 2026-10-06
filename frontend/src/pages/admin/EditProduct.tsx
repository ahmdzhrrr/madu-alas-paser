import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import { api } from "../../services/api";

export default function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: ""
  });

  useEffect(() => {

    loadCategories();
    loadProduct();

  }, []);

  async function loadCategories() {

    const response =
      await api.get("/categories");

    setCategories(response.data);

  }

  async function loadProduct() {

    const response =
      await api.get(`/products/${id}`);

    const product =
      response.data;

    setForm({
      name: product.name,
      description:
        product.description || "",
      price:
        product.price.toString(),
      stock:
        product.stock.toString(),
      categoryId:
        product.categoryId,
      imageUrl:
        product.imageUrl || ""
    });

  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    await api.put(
      `/products/${id}`,
      {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      }
    );

    navigate(
      "/admin/products"
    );

  }

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Edit Produk
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow"
      >

        <input
          className="border w-full p-3 mb-4"
          placeholder="Nama Produk"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <textarea
          className="border w-full p-3 mb-4"
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value
            })
          }
        />

        <input
          type="number"
          className="border w-full p-3 mb-4"
          placeholder="Harga"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value
            })
          }
        />

        <input
          type="number"
          className="border w-full p-3 mb-4"
          placeholder="Stok"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value
            })
          }
        />

        <select
          className="border w-full p-3 mb-4"
          value={form.categoryId}
          onChange={(e) =>
            setForm({
              ...form,
              categoryId:
                e.target.value
            })
          }
        >

          {categories.map((cat) => (

            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>

          ))}

        </select>

        <input
          className="border w-full p-3 mb-4"
          placeholder="URL Gambar"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({
              ...form,
              imageUrl:
                e.target.value
            })
          }
        />

        <button
          className="bg-amber-700 text-white px-5 py-3 rounded"
        >
          Update Produk
        </button>

      </form>

    </AdminLayout>

  );
}