import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

import { api } from "../services/api";

export default function Products() {
  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-amber-50/40">

      <Navbar />

      <main>
        {/* Header */}
        <section className="pt-16 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-7xl mx-auto px-6 md:px-10">

            <div className="text-center max-w-2xl mx-auto">

              <p className="text-amber-600 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
                Koleksi Kami
              </p>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Produk Madu Alas Paser
              </h1>

              <p className="mt-5 text-gray-500 text-base md:text-lg leading-relaxed">
                Temukan berbagai pilihan madu berkualitas
                dari alam Paser, Kalimantan Timur.
              </p>

            </div>

          </div>
        </section>

        {/* Products */}
        <section className="pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-10">

            {products.length > 0 ? (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>

            ) : (

              <div className="bg-white rounded-3xl border border-gray-100 py-20 text-center shadow-sm">

                <div className="text-5xl mb-5">
                  🍯
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Belum Ada Produk
                </h2>

                <p className="text-gray-500 mt-2">
                  Produk Madu Alas Paser belum tersedia.
                </p>

              </div>

            )}

          </div>
        </section>

      </main>

    </div>
  );
}