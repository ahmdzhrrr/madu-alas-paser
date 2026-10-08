import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../services/api";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
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
    <section
      id="produk"
      className="py-20 md:py-28 bg-amber-50/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-amber-600 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Produk Pilihan
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Temukan Madu Pilihan Kami
          </h2>

          <p className="mt-5 text-gray-500 text-base md:text-lg leading-relaxed">
            Pilihan madu berkualitas dari alam Paser,
            cocok untuk dinikmati bersama keluarga.
          </p>

        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-14">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            Belum ada produk tersedia.
          </div>
        )}

        {/* Button */}
        {products.length > 6 && (
          <div className="flex justify-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition"
            >
              Lihat Semua Produk
              <span>→</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}