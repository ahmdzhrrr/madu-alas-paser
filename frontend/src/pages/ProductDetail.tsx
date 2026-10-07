import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { api } from "../services/api";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export default function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] =
    useState<any>(null);

  const [quantity, setQuantity] =
    useState(1);

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

  function addToCart() {

    const existingCart =
      JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

    const existingItem =
      existingCart.find(
        (item: CartItem) =>
          item.productId === product.id
      );

    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      existingCart.push({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        quantity
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Produk berhasil ditambahkan ke keranjang");

  }

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

            {product.stock > 0 && (
              <div className="mt-5">

                <label className="block mb-2 font-medium">
                  Jumlah
                </label>

                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => {

                    const value =
                      Number(e.target.value);

                    if (
                      value >= 1 &&
                      value <= product.stock
                    ) {
                      setQuantity(value);
                    }

                  }}
                  className="border rounded-lg px-4 py-2 w-24"
                />

              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-6">

              {product.stock > 0 && (
                <button
                  onClick={addToCart}
                  className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800"
                >
                  🛒 Tambah ke Keranjang
                </button>
              )}

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Pesan via WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}