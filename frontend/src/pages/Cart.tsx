import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export default function Cart() {

  const [cart, setCart] =
    useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {

    const savedCart =
      JSON.parse(
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

    const updatedCart =
      cart.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity
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

    const updatedCart =
      cart.filter(
        (item) =>
          item.productId !== productId
      );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-8">
          Keranjang Belanja
        </h1>

        {cart.length === 0 ? (

          <div className="text-center py-16">

            <p className="text-gray-500 text-lg mb-5">
              Keranjang kamu masih kosong.
            </p>

            <a
              href="/products"
              className="inline-block bg-amber-700 text-white px-6 py-3 rounded-lg"
            >
              Lihat Produk
            </a>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Daftar Produk */}

            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.productId}
                  className="bg-white border rounded-xl p-5 flex gap-5"
                >

                  <img
                    src={
                      item.imageUrl ||
                      "https://placehold.co/150x100"
                    }
                    alt={item.name}
                    className="w-28 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">

                    <h2 className="font-semibold text-lg">
                      {item.name}
                    </h2>

                    <p className="text-amber-700 font-semibold mt-1">
                      Rp{" "}
                      {item.price.toLocaleString(
                        "id-ID"
                      )}
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                        className="border rounded px-3 py-1"
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        className="border rounded px-3 py-1"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="font-bold">
                      Rp{" "}
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString("id-ID")}
                    </p>

                    <button
                      onClick={() =>
                        removeItem(
                          item.productId
                        )
                      }
                      className="text-red-500 text-sm mt-4"
                    >
                      Hapus
                    </button>

                  </div>

                </div>

              ))}

            </div>


            {/* Ringkasan */}

            <div>

              <div className="bg-gray-50 rounded-xl p-6">

                <h2 className="text-xl font-bold mb-5">
                  Ringkasan Pesanan
                </h2>

                <div className="flex justify-between mb-3">
                  <span>
                    Total Produk
                  </span>

                  <span>
                    {cart.reduce(
                      (sum, item) =>
                        sum + item.quantity,
                      0
                    )}{" "}
                    item
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-bold">

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

                <a
                  href="/checkout"
                  className="block text-center bg-amber-700 text-white py-3 rounded-lg mt-6"
                >
                  Lanjut ke Checkout
                </a>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}
