import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { api } from "../services/api";

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

  if (loading) {

    return (
      <div>

        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          Memuat pesanan...
        </div>

      </div>
    );

  }

  if (!order) {

    return (
      <div>

        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">

          <h1 className="text-2xl font-bold mb-3">
            Pesanan Tidak Ditemukan
          </h1>

          <p className="text-gray-500 mb-6">
            Nomor pesanan tidak ditemukan.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-amber-700 text-white px-6 py-3 rounded-lg"
          >
            Kembali ke Produk
          </button>

        </div>

      </div>
    );

  }

  return (

    <div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            ✓
          </div>

          <h1 className="text-3xl font-bold">
            Pesanan Berhasil!
          </h1>

          <p className="text-gray-500 mt-2">
            Terima kasih telah berbelanja di
            Madu Alas Paser.
          </p>

        </div>


        {/* Nomor Pesanan */}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center mb-6">

          <p className="text-gray-600">
            Nomor Pesanan
          </p>

          <p className="text-2xl font-bold text-amber-700 mt-2">
            {order.orderNumber}
          </p>

          <p className="text-sm text-gray-500 mt-3">
            Simpan nomor ini untuk mengecek
            status pesanan.
          </p>

        </div>


        {/* Status */}

        <div className="bg-white border rounded-xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-5">
            Status Pesanan
          </h2>

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-amber-600" />

            <span className="font-semibold">
              {order.status}
            </span>

          </div>

        </div>


        {/* Detail Customer */}

        <div className="bg-white border rounded-xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-5">
            Detail Pengiriman
          </h2>

          <div className="space-y-2">

            <p>
              <span className="font-medium">
                Nama:
              </span>{" "}
              {order.customerName}
            </p>

            <p>
              <span className="font-medium">
                WhatsApp:
              </span>{" "}
              {order.customerPhone}
            </p>

            <p>
              <span className="font-medium">
                Alamat:
              </span>{" "}
              {order.customerAddress}
            </p>

          </div>

        </div>


        {/* Produk */}

        <div className="bg-white border rounded-xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-5">
            Detail Pesanan
          </h2>

          <div className="space-y-4">

            {order.items.map((item) => (

              <div
                key={item.id}
                className="flex justify-between border-b pb-4"
              >

                <div>

                  <p className="font-medium">
                    {item.productName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.quantity} × Rp{" "}
                    {Number(item.price).toLocaleString(
                      "id-ID"
                    )}
                  </p>

                </div>

                <p className="font-semibold">
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

          <div className="flex justify-between text-lg font-bold pt-5">

            <span>
              Total
            </span>

            <span className="text-amber-700">
              Rp{" "}
              {Number(order.total).toLocaleString(
                "id-ID"
              )}
            </span>

          </div>

        </div>


        <div className="text-center">

          <button
            onClick={() => navigate("/products")}
            className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800"
          >
            Kembali Belanja
          </button>

        </div>

      </div>

    </div>

  );
}