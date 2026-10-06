import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

import { api } from "../services/api";

export default function Products() {

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    api.get("/products")
      .then((res) => {

        setProducts(res.data);

      });

  }, []);

  return (
    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Produk Madu Alas Paser
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </div>
  );
}