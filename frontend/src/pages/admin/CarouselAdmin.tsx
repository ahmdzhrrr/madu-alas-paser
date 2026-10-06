import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { api } from "../../services/api";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  isActive: boolean;
}

export default function CarouselAdmin() {

  const [slides, setSlides] =
    useState<Slide[]>([]);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    isActive: true
  });

  const [uploading, setUploading] =
  useState(false);

  useEffect(() => {

    loadSlides();

  }, []);

  async function loadSlides() {
    try {
      const response = await api.get("/carousel");
      setSlides(response.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data carousel");
    }
  }

  async function createSlide() {
    if (!form.title || !form.imageUrl) {
      alert("Judul dan gambar wajib diisi");
      return;
    }
  
    try {
      await api.post("/carousel", form);
  
      setForm({
        title: "",
        subtitle: "",
        imageUrl: "",
        isActive: true
      });
  
      await loadSlides();
  
      alert("Banner berhasil ditambahkan");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan banner");
    }
  }

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
  
    const file =
      e.target.files?.[0];
  
    if (!file) return;
  
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
          "/upload/Carousel",
          formData,
        );
  
      setForm((prev) => ({
        ...prev,
        imageUrl:
          response.data.imageUrl
      }));
  
    } catch (error) {
  
      console.error(error);
  
      alert("Upload gagal");
  
    } finally {
  
      setUploading(false);
  
    }
  
  }

  async function deleteSlide(
    id: number
  ) {

    const confirmDelete =
      confirm(
        "Yakin hapus banner?"
      );

    if (!confirmDelete)
      return;

    await api.delete(
      `/carousel/${id}`
    );

    loadSlides();

  }

  async function toggleStatus(
    slide: Slide
  ) {

    await api.put(
      `/carousel/${slide.id}`,
      {
        isActive:
          !slide.isActive
      }
    );

    loadSlides();

  }

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Carousel Banner
      </h1>

      {/* FORM TAMBAH */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="font-bold text-lg mb-4">
          Tambah Banner
        </h2>

        <input
          type="text"
          placeholder="Judul"
          className="border p-3 w-full mb-3"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Subjudul"
          className="border p-3 w-full mb-3"
          value={form.subtitle}
          onChange={(e) =>
            setForm({
              ...form,
              subtitle:
                e.target.value
            })
          }
        />

        <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        />

        {uploading && (

        <p className="mt-2 text-blue-600">
            Uploading...
        </p>

        )}

        {form.imageUrl && (

        <img
            src={form.imageUrl}
            alt="Preview"
            className="h-40 rounded border mt-3 mb-3"
        />

        )}

        <button
          onClick={createSlide}
          disabled={uploading}
          className="bg-amber-700 text-white px-5 py-3 rounded disabled:opacity-50"
        >
          {uploading ? "Mengupload..." : "Simpan Banner"}
        </button>

      </div>

      {/* TABEL */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr>

              <th className="border p-3">
                Gambar
              </th>

              <th className="border p-3">
                Judul
              </th>

              <th className="border p-3">
                Subjudul
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

            {slides.map((slide) => (

              <tr key={slide.id}>

                <td className="border p-3">

                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="h-20 rounded"
                  />

                </td>

                <td className="border p-3">
                  {slide.title}
                </td>

                <td className="border p-3">
                  {slide.subtitle}
                </td>

                <td className="border p-3">

                  {slide.isActive
                    ? "Aktif"
                    : "Nonaktif"}

                </td>

                <td className="border p-3">

                  <button
                    onClick={() =>
                      toggleStatus(
                        slide
                      )
                    }
                    className="mr-3 text-blue-600"
                  >
                    {slide.isActive
                      ? "Nonaktifkan"
                      : "Aktifkan"}
                  </button>

                  <button
                    onClick={() =>
                      deleteSlide(
                        slide.id
                      )
                    }
                    className="text-red-600"
                  >
                    Hapus
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}