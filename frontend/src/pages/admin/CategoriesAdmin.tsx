import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { api } from "../../services/api";

export default function CategoriesAdmin() {

  const [categories, setCategories] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  useEffect(() => {

    loadCategories();

  }, []);

  async function loadCategories() {

    const response =
      await api.get("/categories");

    setCategories(response.data);

  }

  async function createCategory() {

    if (!name) return;

    await api.post(
      "/categories",
      {
        name
      }
    );

    setName("");

    loadCategories();

  }

  async function updateCategory(
    id: string,
    oldName: string
  ) {
  
    const newName =
      prompt(
        "Nama kategori",
        oldName
      );
  
    if (!newName) return;
  
    await api.put(
      `/categories/${id}`,
      {
        name: newName
      }
    );
  
    loadCategories();
  
  }

  async function deleteCategory(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Yakin hapus kategori?"
      );

    if (!confirmDelete)
      return;

    await api.delete(
      `/categories/${id}`
    );

    loadCategories();

  }

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">

        Kategori

      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <div className="flex gap-3">

          <input
            className="border p-3 flex-1"
            placeholder="Nama kategori"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <button
            onClick={createCategory}
            className="bg-amber-700 text-white px-5 rounded"
          >
            Tambah
          </button>

        </div>

      </div>

      <table className="w-full bg-white">

        <thead>

          <tr>

            <th className="border p-3">
              Nama
            </th>

            <th className="border p-3">
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>

          {categories.map(
            (category) => (

              <tr
                key={category.id}
              >

                <td className="border p-3">
                  {category.name}
                </td>

                <td className="border p-3">

                    <button
                        onClick={() =>
                        updateCategory(
                            category.id,
                            category.name
                        )
                        }
                        className="mr-3 text-blue-600"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() =>
                        deleteCategory(
                            category.id
                        )
                        }
                        className="text-red-600"
                    >
                        Hapus
                    </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </AdminLayout>

  );
}