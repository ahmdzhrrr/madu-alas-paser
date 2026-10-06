import { useEffect, useState } from "react";
import { api } from "../services/api";

interface SiteSetting {
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  address?: string;
  siteName?: string;
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
    <footer className="bg-amber-700 text-white py-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>

            <h2 className="text-2xl font-bold mb-3">
              {setting?.siteName || "Madu Alas Paser"}
            </h2>

            <p className="text-amber-100 leading-relaxed">
              Madu alami dari Paser dengan kualitas terbaik.
            </p>

          </div>


          {/* Kontak */}
          <div>

            <h3 className="text-lg font-semibold mb-4">
              Kontak
            </h3>

            {setting?.address && (
              <p className="text-amber-100 mb-3">
                📍 {setting.address}
              </p>
            )}

            {setting?.whatsapp && (
              <a
                href={`https://wa.me/${setting.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-amber-100 hover:text-white transition"
              >
                📱 WhatsApp
              </a>
            )}

          </div>


          {/* Sosial Media */}
          <div>

            <h3 className="text-lg font-semibold mb-4">
              Ikuti Kami
            </h3>

            <div className="flex flex-col gap-2">

              {setting?.instagram && (
                <a
                  href={setting.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-100 hover:text-white transition"
                >
                  Instagram
                </a>
              )}

              {setting?.facebook && (
                <a
                  href={setting.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-100 hover:text-white transition"
                >
                  Facebook
                </a>
              )}

            </div>

          </div>

        </div>


        {/* Copyright */}
        <div className="border-t border-amber-500 mt-8 pt-5 text-center text-amber-100">

          © 2026 Madu Alas Paser. All rights reserved.

        </div>

      </div>

    </footer>
  );
}
