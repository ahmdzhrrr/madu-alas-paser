import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export default function Checkout() {

  const navigate = useNavigate();

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [customerName, setCustomerName] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [customerAddress, setCustomerAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const savedCart =
      JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

    setCart(savedCart);

  }, []);

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price * item.quantity,
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

      const response =
        await api.post("/orders", {

          customerName,
          customerPhone,
          customerAddress,

          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity
          }))

        });

      const order =
        response.data;

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
      <div>

        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">

          <h1 className="text-2xl font-bold mb-4">
            Keranjang Kosong
          </h1>

          <p className="text-gray-500 mb-6">
            Silakan pilih produk terlebih dahulu.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-amber-700 text-white px-6 py-3 rounded-lg"
          >
            Lihat Produk
          </button>

        </div>

      </div>
    );

  }

  return (

    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Form Customer */}

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white border rounded-xl p-6"
          >

            <h2 className="text-xl font-bold mb-6">
              Data Pemesan
            </h2>

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Nama Lengkap
              </label>

              <input
                type="text"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Masukkan nama lengkap"
              />

            </div>

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Nomor WhatsApp
              </label>

              <input
                type="tel"
                value={customerPhone}
                onChange={(e) =>
                  setCustomerPhone(e.target.value)
                }
                required
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Contoh: 081234567890"
              />

            </div>

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Alamat Lengkap
              </label>

              <textarea
                value={customerAddress}
                onChange={(e) =>
                  setCustomerAddress(e.target.value)
                }
                required
                rows={5}
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Masukkan alamat lengkap pengiriman"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 disabled:opacity-50"
            >
              {loading
                ? "Memproses Pesanan..."
                : "Buat Pesanan"}
            </button>

          </form>


          {/* Ringkasan Pesanan */}

          <div>

            <div className="bg-gray-50 rounded-xl p-6">

              <h2 className="text-xl font-bold mb-5">
                Pesanan Kamu
              </h2>

              <div className="space-y-4">

                {cart.map((item) => (

                  <div
                    key={item.productId}
                    className="flex justify-between gap-4"
                  >

                    <div>

                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.quantity} × Rp{" "}
                        {item.price.toLocaleString(
                          "id-ID"
                        )}
                      </p>

                    </div>

                    <p className="font-semibold">
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

              <div className="border-t mt-5 pt-5 flex justify-between text-lg font-bold">

                <span>
                  Total
                </span>

                <span className="text-amber-700">
                  Rp{" "}
                  {total.toLocaleString(
                    "id-ID"
                  )}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}