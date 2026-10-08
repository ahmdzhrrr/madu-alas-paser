import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { api } from "../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowRight,
  faCartShopping,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([]);

  const [customerName, setCustomerName] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [customerAddress, setCustomerAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Keranjang masih kosong.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/orders",
        {
          customerName,
          customerPhone,
          customerAddress,

          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }
      );

      const order = response.data;

      localStorage.removeItem("cart");

      navigate(
        `/pesanan/${order.orderNumber}`
      );
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Gagal membuat pesanan."
      );
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50/40">

        <Navbar />

        <main className="py-16 md:py-20">

          <div className="max-w-4xl mx-auto px-6 text-center">

            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm py-20 px-6">

              <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-2xl">
                <FontAwesomeIcon
                  icon={faCartShopping}
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6">
                Keranjang Kosong
              </h1>

              <p className="text-gray-500 mt-3">
                Silakan pilih produk terlebih dahulu
                sebelum melanjutkan ke checkout.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/products")
                }
                className="inline-flex items-center gap-2 mt-7 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition"
              >
                Lihat Produk
                <FontAwesomeIcon
                  icon={faArrowRight}
                />
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/40">

      <Navbar />

      <main className="py-12 md:py-16">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Header */}
          <div className="mb-10">

            <p className="text-amber-600 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Pesanan
            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              Checkout
            </h1>

            <p className="mt-4 text-gray-500 text-base md:text-lg">
              Lengkapi data pemesan untuk menyelesaikan
              pesananmu.
            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Customer Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm"
            >

              <div className="flex items-center gap-3 mb-8">

                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUser}
                  />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    Data Pemesan
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Masukkan informasi untuk pengiriman
                    pesanan.
                  </p>

                </div>

              </div>

              {/* Name */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>

                <div className="relative">

                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                    placeholder="Masukkan nama lengkap"
                  />

                </div>

              </div>

              {/* Phone */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor WhatsApp
                </label>

                <div className="relative">

                  <FontAwesomeIcon
                    icon={faPhone}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) =>
                      setCustomerPhone(
                        e.target.value
                      )
                    }
                    required
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                    placeholder="Contoh: 081234567890"
                  />

                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Nomor ini akan digunakan untuk
                  menghubungi kamu terkait pesanan.
                </p>

              </div>

              {/* Address */}
              <div className="mb-8">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Alamat Lengkap
                </label>

                <div className="relative">

                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="absolute left-4 top-4 text-gray-400"
                  />

                  <textarea
                    value={customerAddress}
                    onChange={(e) =>
                      setCustomerAddress(
                        e.target.value
                      )
                    }
                    required
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition resize-none"
                    placeholder="Masukkan alamat lengkap pengiriman"
                  />

                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Memproses Pesanan..."
                  : "Buat Pesanan"}

                {!loading && (
                  <FontAwesomeIcon
                    icon={faArrowRight}
                  />
                )}
              </button>

            </form>

            {/* Order Summary */}
            <div>

              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-7 shadow-sm lg:sticky lg:top-28">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      Pesanan Kamu
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {totalItems} item
                    </p>

                  </div>

                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                    />
                  </div>

                </div>

                <div className="mt-7 space-y-5">

                  {cart.map((item) => (

                    <div
                      key={item.productId}
                      className="flex gap-3"
                    >

                      {/* Product Image */}
                      <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-amber-50">

                        <img
                          src={
                            item.imageUrl ||
                            "https://placehold.co/150x150"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">

                        <p className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.quantity} × Rp{" "}
                          {item.price.toLocaleString(
                            "id-ID"
                          )}
                        </p>

                      </div>

                      <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                        Rp{" "}
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </p>

                    </div>

                  ))}

                </div>

                {/* Total */}
                <div className="border-t border-gray-100 mt-7 pt-6">

                  <div className="flex justify-between items-end">

                    <span className="font-semibold text-gray-900">
                      Total Pesanan
                    </span>

                    <span className="text-2xl font-bold text-amber-700">
                      Rp{" "}
                      {total.toLocaleString(
                        "id-ID"
                      )}
                    </span>

                  </div>

                </div>

                <div className="mt-5 p-4 rounded-xl bg-amber-50">

                  <p className="text-sm text-amber-800 leading-relaxed">
                    Setelah pesanan dibuat, kamu akan
                    mendapatkan nomor pesanan untuk
                    melacak status pesanan.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
