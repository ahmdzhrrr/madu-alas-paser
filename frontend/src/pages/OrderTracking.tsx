import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { api } from "../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowRight,
  faCheck,
  faCopy,
  faLocationDot,
  faPhone,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface OrderItem {
  id: number;
  productName: string;
  price: string;
  quantity: number;
}

interface Order {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderTracking() {
  const { orderNumber } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    if (!orderNumber) {
      return;
    }

    api
      .get(`/orders/${orderNumber}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderNumber]);

  async function copyOrderNumber() {
    if (!order?.orderNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        order.orderNumber
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(error);

      alert(
        "Nomor pesanan gagal disalin."
      );
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50/40">

        <Navbar />

        <main className="flex items-center justify-center min-h-[60vh] px-6">

          <div className="text-center">

            <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faShoppingBag}
              />
            </div>

            <p className="text-gray-500 mt-4">
              Memuat pesanan...
            </p>

          </div>

        </main>

      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-amber-50/40">

        <Navbar />

        <main className="py-16 md:py-20">

          <div className="max-w-4xl mx-auto px-6">

            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm py-20 px-6 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl">
                !
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6">
                Pesanan Tidak Ditemukan
              </h1>

              <p className="text-gray-500 mt-3">
                Nomor pesanan tidak ditemukan.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/products")
                }
                className="inline-flex items-center gap-2 mt-7 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition"
              >
                Kembali ke Produk
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

        <div className="max-w-5xl mx-auto px-6 md:px-10">

          {/* Success Header */}
          <div className="text-center mb-10">

            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center text-2xl">

              <FontAwesomeIcon
                icon={faCheck}
              />

            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6">
              Pesanan Berhasil!
            </h1>

            <p className="text-gray-500 mt-3">
              Terima kasih telah berbelanja di
              Madu Alas Paser.
            </p>

          </div>

          {/* Order Number */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 md:p-8 text-center mb-6">

            <p className="text-sm font-medium text-amber-800">
              Nomor Pesanan
            </p>

            <div className="flex items-center justify-center gap-3 mt-3">

              <p className="text-2xl md:text-3xl font-bold text-amber-700 tracking-wide">
                {order.orderNumber}
              </p>

              <button
                type="button"
                onClick={copyOrderNumber}
                className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition ${
                  copied
                    ? "bg-green-100 text-green-600"
                    : "bg-white text-amber-700 hover:bg-amber-100"
                }`}
                title={
                  copied
                    ? "Nomor tersalin"
                    : "Salin nomor pesanan"
                }
              >
                <FontAwesomeIcon
                  icon={
                    copied
                      ? faCheck
                      : faCopy
                  }
                />
              </button>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              {copied
                ? "Nomor pesanan berhasil disalin."
                : "Simpan nomor ini untuk mengecek status pesanan"}
            </p>

          </div>

          {/* Status */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-7 shadow-sm mb-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Status Pesanan
              </h2>

            </div>

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-amber-600" />

              <span className="font-semibold text-gray-900">
                {order.status}
              </span>

            </div>

          </div>

          {/* Customer Detail */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-7 shadow-sm mb-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Detail Pengiriman
              </h2>

            </div>

            <div className="space-y-5">

              <div className="flex gap-4">

                <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon
                    icon={faUser}
                  />
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Nama
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {order.customerName}
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon
                    icon={faPhone}
                  />
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    WhatsApp
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {order.customerPhone}
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                  />
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Alamat
                  </p>

                  <p className="font-medium text-gray-900 mt-1 leading-relaxed">
                    {order.customerAddress}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Order Items */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-7 shadow-sm mb-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Detail Pesanan
              </h2>

            </div>

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between gap-5 border-b border-gray-100 pb-4"
                >

                  <div>

                    <p className="font-semibold text-gray-900">
                      {item.productName}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.quantity} × Rp{" "}
                      {Number(
                        item.price
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </p>

                  </div>

                  <p className="font-semibold text-gray-900 whitespace-nowrap">
                    Rp{" "}
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString(
                      "id-ID"
                    )}
                  </p>

                </div>

              ))}

            </div>

            <div className="flex justify-between items-end pt-6">

              <span className="font-semibold text-gray-900">
                Total
              </span>

              <span className="text-2xl font-bold text-amber-700">
                Rp{" "}
                {Number(
                  order.total
                ).toLocaleString(
                  "id-ID"
                )}
              </span>

            </div>

          </div>

          {/* Back */}
          <div className="text-center">

            <button
              type="button"
              onClick={() =>
                navigate("/products")
              }
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition"
            >
              Kembali Belanja
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
