import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState<any[]>([]);

  const [uploading, setUploading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: ""
  });

  useEffect(() => {

    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      });

  }, []);

  async function uploadFile(
    file: File
  ) {

    try {

      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      const response =
        await api.post(
          "/upload/Produk",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      setForm((prev) => ({
        ...prev,
        imageUrl:
          response.data.imageUrl
      }));

    } catch (error) {

      console.error(error);

      alert(
        "Gagal upload gambar"
      );

    } finally {

      setUploading(false);

    }

  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      await api.post(
        "/products",
        {
          ...form,
          price:
            Number(form.price),
          stock:
            Number(form.stock),
          categoryId:
            Number(form.categoryId)
        }
      );

      navigate(
        "/admin/products"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Gagal menyimpan produk"
      );

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow"
    >

      <div className="mb-4">

        <label>Nama Produk</label>

        <input
          className="border w-full p-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value
            })
          }
        />

      </div>

      <div className="mb-4">

        <label>Deskripsi</label>

        <textarea
          className="border w-full p-3"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value
            })
          }
        />

      </div>

      <div className="mb-4">

        <label>Harga</label>

        <input
          type="number"
          className="border w-full p-3"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price:
                e.target.value
            })
          }
        />

      </div>

      <div className="mb-4">

        <label>Stok</label>

        <input
          type="number"
          className="border w-full p-3"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock:
                e.target.value
            })
          }
        />

      </div>

      <div className="mb-4">

        <label>Kategori</label>

        <select
          className="border w-full p-3"
          value={form.categoryId}
          onChange={(e) =>
            setForm({
              ...form,
              categoryId:
                e.target.value
            })
          }
        >

          <option value="">
            Pilih Kategori
          </option>

          {categories.map(
            (category) => (

              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>

            )
          )}

        </select>

      </div>

      <div className="mb-4">

        <label>Foto Produk</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {

            const file =
              e.target.files?.[0];

            if (file) {

              uploadFile(
                file
              );

            }

          }}
        />

      </div>

      {uploading && (

        <div className="mb-4 text-blue-600">
          Uploading gambar...
        </div>

      )}

      {form.imageUrl && (

        <div className="mb-4">

          <img
            src={form.imageUrl}
            alt="Preview"
            className="h-40 rounded border"
          />

        </div>

      )}

      <button
        type="submit"
        className="bg-amber-700 text-white px-5 py-3 rounded"
      >
        Simpan
      </button>

    </form>

  );
}