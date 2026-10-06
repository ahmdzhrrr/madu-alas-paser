import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "./ProductForm";

export default function CreateProduct() {

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Tambah Produk
      </h1>

      <ProductForm />

    </AdminLayout>

  );
}