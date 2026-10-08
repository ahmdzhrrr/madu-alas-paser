import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

import {
  faWhatsapp,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

interface SiteSetting {
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  address?: string;
  siteName?: string;
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

export default function Footer() {
  const [setting, setSetting] =
    useState<SiteSetting | null>(null);

  useEffect(() => {
    api
      .get("/settings")
      .then((res) => {
        setSetting(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <footer className="bg-gray-950 text-white">

      <div className="w-full px-6 md:px-10 lg:px-12">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 py-14">

          {/* Brand */}
          <div className="lg:col-span-4">

            <h2 className="text-2xl md:text-3xl font-bold">
              {setting?.siteName ||
                "Madu Alas Paser"}
            </h2>

            <p className="text-gray-400 leading-relaxed mt-4 max-w-md">
              Madu alami pilihan dari Paser,
              Kalimantan Timur. Menghadirkan
              produk madu berkualitas dengan
              mengutamakan keaslian dan kualitas.
            </p>

            <span className="inline-flex items-center gap-2 text-sm text-amber-400 font-medium">
              <FontAwesomeIcon icon={faLeaf} />
              Produk Lokal Paser
            </span>

          </div>

          {/* Navigasi */}
          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Navigasi
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                Beranda
              </Link>

              <Link
                to="/products"
                className="text-gray-400 hover:text-white transition"
              >
                Produk
              </Link>

              <Link
                to="/pesanan"
                className="text-gray-400 hover:text-white transition"
              >
                Lacak Pesanan
              </Link>

            </div>

          </div>

          {/* Kontak */}
          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Hubungi Kami
            </h3>

            <div className="flex flex-col gap-4">

              {setting?.address && (
                <p className="text-gray-400 leading-relaxed">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="mr-2"
                  />
                  {setting.address}
                </p>
              )}

              {setting?.whatsapp && (
                <a
                href={`https://wa.me/${formatWhatsAppNumber(
                  setting.whatsapp
                )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition"
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="mr-2"
                  />
                  WhatsApp
                </a>
              )}

              {setting?.instagram && (
                <a
                  href={setting.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="mr-2"
                  />
                  Instagram
                </a>
              )}

              {setting?.facebook && (
                <a
                  href={setting.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition"
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="mr-2"
                  />
                  Facebook
                </a>
              )}

            </div>

          </div>

          {/* Maps */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Lokasi Kami
            </h3>

            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7705.369322030701!2d116.18806779357911!3d-1.8740027999999913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df04747133f328b%3A0xa357849d90b8dbc7!2sMadu%20Alas%20Paser!5e1!3m2!1sid!2sid!4v1791434753983!5m2!1sid!2sid"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Lokasi Madu Alas Paser"
              />
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm text-gray-500">
            © 2026{" "}
            {setting?.siteName ||
              "Madu Alas Paser"}.
            {" "}All rights reserved.
          </p>

          <p className="text-sm text-gray-600">
            Produk lokal dari Paser, Kalimantan Timur.
          </p>

        </div>

      </div>

    </footer>
  );
}