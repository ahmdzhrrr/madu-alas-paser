import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { api } from "../services/api";

export default function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] =
    useState<any>(null);

  useEffect(() => {

    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      });

  }, [id]);

  if (!product) {

    return (
      <div>
        Loading...
      </div>
    );

  }

  const waNumber =
    "628123456789";

  const waLink =
    `https://wa.me/${waNumber}?text=Saya ingin memesan ${product.name}`;

  return (

    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <div className="grid md:grid-cols-2 gap-8">

          <img
            src={
              product.imageUrl ||
              "https://placehold.co/600x400"
            }
            alt={product.name}
            className="rounded-xl"
          />

          <div>

            <h1 className="text-4xl font-bold">

              {product.name}

            </h1>

            <p className="mt-4 text-gray-600">

              {product.description}

            </p>

            <p className="mt-6 text-3xl font-bold text-amber-700">

              Rp {Number(product.price)
                .toLocaleString("id-ID")}

            </p>

            <p className="mt-3">

              Stok: {product.stock}

            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Pesan via WhatsApp
            </a>

          </div>

        </div>

      </div>

    </div>

  );
}