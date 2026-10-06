import { useEffect, useState } from "react";
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
      });

  }, []);

  return (

    <section
      id="produk"
      className="py-20"
    >

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">

          Produk Kami

        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </section>
  );
}