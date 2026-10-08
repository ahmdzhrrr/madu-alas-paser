import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMinus,
  faPlus,
  faTrash,
  faArrowRight,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }

  function updateQuantity(
    productId: number,
    quantity: number
  ) {
    if (quantity < 1) {
      return;
    }

    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }

  function removeItem(productId: number) {
    const updatedCart = cart.filter(
      (item) => item.productId !== productId
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-amber-50/40">

      <Navbar />

      <main className="py-12 md:py-16">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Header */}
          <div className="mb-10">

            <p className="text-amber-600 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Belanja
            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              Keranjang Belanja
            </h1>

            <p className="mt-4 text-gray-500 text-base md:text-lg">
              Periksa kembali produk pilihanmu sebelum melanjutkan ke checkout.
            </p>

          </div>

          {cart.length === 0 ? (

            /* Empty Cart */
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm py-20 px-6 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-2xl">
                <FontAwesomeIcon icon={faCartShopping} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-6">
                Keranjang Masih Kosong
              </h2>

              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Belum ada produk yang ditambahkan ke keranjang.
                Yuk, lihat koleksi madu kami.
              </p>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 mt-7 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition"
              >
                Lihat Produk
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

            </div>

          ) : (

            <div className="grid lg:grid-cols-3 gap-8">

              {/* Product List */}
              <div className="lg:col-span-2 space-y-4">

                {cart.map((item) => (

                  <div
                    key={item.productId}
                    className="bg-white border border-gray-100 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex gap-5">

                      {/* Image */}
                      <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 bg-amber-50 rounded-2xl overflow-hidden">

                        <img
                          src={
                            item.imageUrl ||
                            "https://placehold.co/300x300"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      {/* Information */}
                      <div className="flex-1 min-w-0">

                        <div className="flex justify-between gap-4">

                          <div>

                            <h2 className="text-lg md:text-xl font-bold text-gray-900">
                              {item.name}
                            </h2>

                            <p className="text-amber-700 font-semibold mt-2">
                              Rp{" "}
                              {item.price.toLocaleString(
                                "id-ID"
                              )}
                            </p>

                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.productId)
                            }
                            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                            title="Hapus produk"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                            />
                          </button>

                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-between mt-6">

                          <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-30 transition"
                            >
                              <FontAwesomeIcon
                                icon={faMinus}
                              />
                            </button>

                            <span className="w-12 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition"
                            >
                              <FontAwesomeIcon
                                icon={faPlus}
                              />
                            </button>

                          </div>

                          {/* Subtotal */}
                          <div className="text-right">

                            <p className="text-xs text-gray-400 mb-1">
                              Subtotal
                            </p>

                            <p className="font-bold text-gray-900">
                              Rp{" "}
                              {(
                                item.price *
                                item.quantity
                              ).toLocaleString(
                                "id-ID"
                              )}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* Summary */}
              <div>

                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-7 shadow-sm lg:sticky lg:top-28">

                  <h2 className="text-xl font-bold text-gray-900">
                    Ringkasan Pesanan
                  </h2>

                  <div className="mt-6 space-y-4">

                    <div className="flex justify-between text-gray-600">

                      <span>
                        Jumlah Produk
                      </span>

                      <span className="font-medium text-gray-900">
                        {cart.length} produk
                      </span>

                    </div>

                    <div className="flex justify-between text-gray-600">

                      <span>
                        Total Item
                      </span>

                      <span className="font-medium text-gray-900">
                        {totalItems} item
                      </span>

                    </div>

                  </div>

                  <div className="border-t border-gray-100 mt-6 pt-6">

                    <div className="flex justify-between items-end">

                      <span className="font-semibold text-gray-900">
                        Total
                      </span>

                      <span className="text-2xl font-bold text-amber-700">
                        Rp{" "}
                        {total.toLocaleString(
                          "id-ID"
                        )}
                      </span>

                    </div>

                  </div>

                  <Link
                    to="/checkout"
                    className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition"
                  >
                    Lanjut ke Checkout
                    <FontAwesomeIcon
                      icon={faArrowRight}
                    />
                  </Link>

                  <Link
                    to="/products"
                    className="mt-3 w-full inline-flex items-center justify-center text-gray-600 hover:text-amber-700 py-3 rounded-xl font-medium transition"
                  >
                    ← Lanjut Belanja
                  </Link>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}