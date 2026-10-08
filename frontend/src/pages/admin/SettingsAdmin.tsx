import {
    useEffect,
    useState
  } from "react";
  
  import AdminLayout from "../../components/admin/AdminLayout";
  import { api } from "../../services/api";
  
  export default function SettingsAdmin() {
  
    const [form, setForm] =
      useState<any>({});

    const [uploading, setUploading] =
      useState(false);
  
    useEffect(() => {
  
      api
        .get("/settings")
        .then((res) => {
          setForm(res.data || {});
        });
  
    }, []);

    async function uploadLogo(
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
            "/upload/Logo",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );
    
        setForm({
          ...form,
          logoUrl:
            response.data.imageUrl
        });
    
      } catch (error) {
    
        console.error(error);
    
        alert("Upload logo gagal");
    
      } finally {
    
        setUploading(false);
    
      }
    
    }

    async function uploadAboutImage(
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
            "/upload/About",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );
    
        setForm({
          ...form,
          aboutImageUrl:
            response.data.imageUrl
        });
    
      } catch (error) {
    
        console.error(error);
    
        alert("Upload foto About gagal");
    
      } finally {
    
        setUploading(false);
    
      }
    
    }

    async function save() {
  
      await api.put(
        "/settings",
        form
      );
  
      alert("Berhasil disimpan");
  
    }
  
    return (
  
      <AdminLayout>
  
        <h1 className="text-3xl font-bold mb-6">
          Pengaturan Website
        </h1>
        
        <div className="bg-white p-6 rounded-xl shadow">

          <div className="mb-4">

            <label className="block mb-2">
              Logo Website
            </label>

            {form.logoUrl && (

              <img
                src={form.logoUrl}
                alt="Logo"
                className="h-20 mb-3"
              />

            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (file) {

                  uploadLogo(file);

                }

              }}
            />

            </div>

            {uploading && (

            <p className="mb-4">
              Uploading...
            </p>

          )}

          <div className="mb-6">

          <label className="block mb-2">
            Foto About
          </label>

          {form.aboutImageUrl && (
            <img
              src={form.aboutImageUrl}
              alt="Foto About"
              className="w-full max-w-md h-48 object-cover rounded-xl mb-3"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              const file =
                e.target.files?.[0];

              if (file) {
                uploadAboutImage(file);
              }

            }}
          />

          </div>

          <input
            className="border p-3 w-full mb-4"
            placeholder="Nama Website"
            value={form.siteName || ""}
            onChange={(e) =>
              setForm({
                ...form,
                siteName: e.target.value
              })
            }
          />

          <input
            className="border p-3 w-full mb-4"
            placeholder="WhatsApp"
            value={form.whatsapp || ""}
            onChange={(e) =>
              setForm({
                ...form,
                whatsapp:
                  e.target.value
              })
            }
          />
  
          <input
            className="border p-3 w-full mb-4"
            placeholder="Instagram"
            value={form.instagram || ""}
            onChange={(e) =>
              setForm({
                ...form,
                instagram:
                  e.target.value
              })
            }
          />
  
          <input
            className="border p-3 w-full mb-4"
            placeholder="Facebook"
            value={form.facebook || ""}
            onChange={(e) =>
              setForm({
                ...form,
                facebook:
                  e.target.value
              })
            }
          />
  
          <input
            className="border p-3 w-full mb-4"
            placeholder="Alamat"
            value={form.address || ""}
            onChange={(e) =>
              setForm({
                ...form,
                address:
                  e.target.value
              })
            }
          />

          <textarea
            className="border p-3 w-full mb-4"
            placeholder="About Description"
            value={form.aboutDescription || ""}
            onChange={(e) =>
              setForm({
                ...form,
                aboutDescription: e.target.value
              })
            }
          />

          <input
            className="border p-3 w-full mb-4"
            placeholder="Feature Title"
            value={form.featureTitle || ""}
            onChange={(e) =>
              setForm({
                ...form,
                featureTitle: e.target.value
              })
            }
          />

          <input
            className="border p-3 w-full mb-4"
            placeholder="Feature 1"
            value={form.feature1 || ""}
            onChange={(e) =>
              setForm({
                ...form,
                feature1: e.target.value
              })
            }
          />

          <input
            className="border p-3 w-full mb-4"
            placeholder="Feature 2"
            value={form.feature2 || ""}
            onChange={(e) =>
              setForm({
                ...form,
                feature2: e.target.value
              })
            }
          />

          <input
            className="border p-3 w-full mb-4"
            placeholder="Feature 3"
            value={form.feature3 || ""}
            onChange={(e) =>
              setForm({
                ...form,
                feature3: e.target.value
              })
            }
          />
            
          <button
            onClick={save}
            className="bg-amber-700 text-white px-5 py-3 rounded"
          >
            Simpan
          </button>
  
        </div>
  
      </AdminLayout>
    );
  }