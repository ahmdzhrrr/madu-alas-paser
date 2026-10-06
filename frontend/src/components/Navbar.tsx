import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Navbar() {

  const [setting, setSetting] =
    useState<any>(null);

  useEffect(() => {

    api
      .get("/settings")
      .then((res) => {
        setSetting(res.data);
      });

  }, []);

  return (

    <nav className="bg-amber-700 text-white">

      <div className="px-2 py-4 flex items-center gap-2">

        <img
          src={setting?.logoUrl}
          alt="Logo"
          className="h-18"
        />

        <h1 className="font-bold text-xl">

          {setting?.siteName || "Madu Alas Paser"}

        </h1>

      </div>

    </nav>
  );

}