import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { api } from "../../services/api";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  isActive: boolean;
}

export default function TestimonialsAdmin() {

  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([]);

  const [form, setForm] = useState({
    name: "",
    content: "",
    rating: 5,
    isActive: true
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {

    try {

      const response =
        await api.get("/testimonials");

      setTestimonials(response.data);

    } catch (error) {

      console.error(error);
      alert("Gagal mengambil data testimonial");

    }

  }

  async function createTestimonial() {

    if (!form.name || !form.content) {

      alert("Nama dan testimonial wajib diisi");
      return;

    }

    try {

      await api.post(
        "/testimonials",
        form
      );

      setForm({
        name: "",
        content: "",
        rating: 5,
        isActive: true
      });

      await loadTestimonials();

      alert("Testimonial berhasil ditambahkan");

    } catch (error) {

      console.error(error);
      alert("Gagal menyimpan testimonial");

    }

  }

  async function deleteTestimonial(
    id: number
  ) {

    const confirmDelete =
      confirm(
        "Yakin hapus testimonial?"
      );

    if (!confirmDelete)
      return;

    try {

      await api.delete(
        `/testimonials/${id}`
      );

      await loadTestimonials();

    } catch (error) {

      console.error(error);
      alert("Gagal menghapus testimonial");

    }

  }

  async function toggleStatus(
    testimonial: Testimonial
  ) {

    try {

      await api.put(
        `/testimonials/${testimonial.id}`,
        {
          isActive:
            !testimonial.isActive
        }
      );

      await loadTestimonials();

    } catch (error) {

      console.error(error);
      alert("Gagal mengubah status");

    }

  }

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Testimonials
      </h1>

      {/* FORM TAMBAH */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="font-bold text-lg mb-4">
          Tambah Testimonial
        </h2>

        <input
          type="text"
          placeholder="Nama pelanggan"
          className="border p-3 w-full mb-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <textarea
          placeholder="Isi testimonial"
          className="border p-3 w-full mb-3"
          rows={4}
          value={form.content}
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value
            })
          }
        />

        <select
          className="border p-3 w-full mb-3"
          value={form.rating}
          onChange={(e) =>
            setForm({
              ...form,
              rating:
                Number(e.target.value)
            })
          }
        >
          <option value={5}>5 Bintang</option>
          <option value={4}>4 Bintang</option>
          <option value={3}>3 Bintang</option>
          <option value={2}>2 Bintang</option>
          <option value={1}>1 Bintang</option>
        </select>

        <button
          onClick={createTestimonial}
          className="bg-amber-700 text-white px-5 py-3 rounded"
        >
          Simpan Testimonial
        </button>

      </div>

      {/* TABEL */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr>

              <th className="border p-3">
                Nama
              </th>

              <th className="border p-3">
                Testimonial
              </th>

              <th className="border p-3">
                Rating
              </th>

              <th className="border p-3">
                Status
              </th>

              <th className="border p-3">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {testimonials.map(
              (testimonial) => (

                <tr key={testimonial.id}>

                  <td className="border p-3">
                    {testimonial.name}
                  </td>

                  <td className="border p-3">
                    {testimonial.content}
                  </td>

                  <td className="border p-3">
                    {"★".repeat(
                      testimonial.rating
                    )}
                  </td>

                  <td className="border p-3">

                    {testimonial.isActive
                      ? "Aktif"
                      : "Nonaktif"}

                  </td>

                  <td className="border p-3">

                    <button
                      onClick={() =>
                        toggleStatus(
                          testimonial
                        )
                      }
                      className="mr-3 text-blue-600"
                    >
                      {testimonial.isActive
                        ? "Nonaktifkan"
                        : "Aktifkan"}
                    </button>

                    <button
                      onClick={() =>
                        deleteTestimonial(
                          testimonial.id
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

      </div>

    </AdminLayout>

  );
}