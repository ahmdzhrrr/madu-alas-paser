import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { api } from "../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface SiteSetting {
  whatsapp: string;
}

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] =
    useState<any>(null);

  const [setting, setSetting] =
    useState<SiteSetting | null>(null);

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api
      .get("/settings")
      .then((res) => {
        setSetting(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-amber-50/40">
        <Navbar />

        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500">
            Memuat produk...
          </p>
        </div>
      </div>
    );
  }

  function formatWhatsAppNumber(phone: string) {
    const number = phone.replace(/\D/g, "");

    if (number.startsWith("0")) {
      return `62${number.slice(1)}`;
    }

    if (number.startsWith("62")) {
      return number;
    }

    return number;
  }

  const waNumber = setting?.whatsapp
    ? formatWhatsAppNumber(setting.whatsapp)
    : "";

  const waMessage = encodeURIComponent(
    `Halo, saya ingin memesan ${product.name}.`
  );

  const waLink = waNumber
    ? `https://wa.me/${waNumber}?text=${waMessage}`
    : "#";

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
        quantity,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert(
      "Produk berhasil ditambahkan ke keranjang"
    );
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(product.stock, current + 1)
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/40">

      <Navbar />

      <main className="py-12 md:py-16">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-500">
            Beranda
            <span className="mx-2">/</span>
            Produk
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {product.name}
            </span>
          </div>

          {/* Detail */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            <div className="grid md:grid-cols-2">

              {/* Image */}
              <div className="bg-amber-50 p-6 md:p-10">

                <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">

                  <img
                    src={
                      product.imageUrl ||
                      "https://placehold.co/600x600"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>

              {/* Information */}
              <div className="p-8 md:p-12 flex flex-col justify-center">

                {/* Category */}
                {product.category?.name && (
                  <span className="inline-flex w-fit items-center bg-amber-50 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full">
                    {product.category.name}
                  </span>
                )}

                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mt-5">
                  {product.name}
                </h1>

                <div className="w-16 h-1 bg-amber-500 rounded-full mt-6" />

                {/* Description */}
                <p className="mt-6 text-gray-600 leading-relaxed text-base md:text-lg">
                  {product.description ||
                    "Madu berkualitas pilihan dari alam Paser, Kalimantan Timur."}
                </p>

                {/* Price */}
                <div className="mt-8">

                  <p className="text-sm text-gray-400 mb-1">
                    Harga
                  </p>

                  <p className="text-3xl font-bold text-amber-700">
                    Rp{" "}
                    {Number(
                      product.price
                    ).toLocaleString("id-ID")}
                  </p>

                </div>

                {/* Stock */}
                <div className="mt-5">

                  <span
                    className={
                      product.stock > 0
                        ? "text-sm font-medium text-green-600"
                        : "text-sm font-medium text-red-600"
                    }
                  >
                    {product.stock > 0
                      ? `Stok tersedia: ${product.stock}`
                      : "Stok habis"}
                  </span>

                </div>

                {/* Quantity */}
                {product.stock > 0 && (
                  <div className="mt-6">

                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Jumlah
                    </p>

                    <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">

                      <button
                        type="button"
                        onClick={
                          decreaseQuantity
                        }
                        disabled={
                          quantity <= 1
                        }
                        className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-40 transition"
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                        />
                      </button>

                      <span className="w-12 text-center font-semibold text-gray-900">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={
                          increaseQuantity
                        }
                        disabled={
                          quantity >=
                          product.stock
                        }
                        className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-40 transition"
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                        />
                      </button>

                    </div>

                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">

                  {product.stock > 0 && (
                    <button
                      onClick={addToCart}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition"
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                      />
                      Tambah ke Keranjang
                    </button>
                  )}

                  {waNumber && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                      />
                      Pesan via WhatsApp
                    </a>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}