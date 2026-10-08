import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function OrderSearch() {

  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] =
    useState("");

  function handleSubmit(
    event: FormEvent
  ) {

    event.preventDefault();

    const trimmedOrderNumber =
      orderNumber.trim();

    if (!trimmedOrderNumber) {
      return;
    }

    navigate(
      `/pesanan/${encodeURIComponent(
        trimmedOrderNumber
      )}`
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div className="w-full max-w-lg bg-white border rounded-2xl shadow-sm p-8">

          <h1 className="text-2xl font-bold text-center">
            Lacak Pesanan
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Masukkan nomor pesanan untuk melihat
            status pesanan Anda.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6"
          >

            <label className="block text-sm font-medium mb-2">
              Nomor Pesanan
            </label>

            <input
              type="text"
              value={orderNumber}
              onChange={(e) =>
                setOrderNumber(e.target.value)
              }
              placeholder="Contoh: MAP-20261007-2170"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              type="submit"
              className="w-full mt-4 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700"
            >
              Lacak Pesanan
            </button>

          </form>

        </div>

      </div>
    </>
  );
}