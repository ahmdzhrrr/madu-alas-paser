import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { api } from "../services/api";

export default function Navbar() {

  const [setting, setSetting] =
    useState<any>(null);

  useEffect(() => {

    api
      .get("/settings")
      .then((res) => {
        setSetting(res.data);
      })
      .catch(console.error);

  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            {setting?.logoUrl && (
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">

                <img
                  src={setting.logoUrl}
                  alt="Logo"
                  className="h-10 w-10 object-contain"
                />

              </div>
            )}

            <div className="leading-tight">

              <h1 className="text-lg font-bold text-gray-900">
                {setting?.siteName || "Madu Alas Paser"}
              </h1>

              <p className="text-xs text-gray-500">
                Madu Asli dari Paser
              </p>

            </div>

          </Link>


          {/* Navigation */}

          <div className="hidden md:flex items-center gap-1">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "text-amber-700 bg-amber-50"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                }`
              }
            >
              Beranda
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "text-amber-700 bg-amber-50"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                }`
              }
            >
              Produk
            </NavLink>

            <NavLink
              to="/pesanan"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "text-amber-700 bg-amber-50"
                    : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
                }`
              }
            >
              Lacak Pesanan
            </NavLink>

          </div>


          {/* Cart */}

          <Link
            to="/cart"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition"
          >

            <FontAwesomeIcon icon={faCartShopping} />

            <span className="hidden sm:inline">
              Keranjang
            </span>

          </Link>

        </div>

      </div>

    </nav>
  );
}