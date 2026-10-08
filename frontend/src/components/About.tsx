export default function About({
  setting
}: {
  setting: any;
}) {
  return (
    <section className="py-20 md:py-28 bg-amber-50/50">

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Content */}

          <div>

            <p className="text-amber-600 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Tentang Kami
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Tentang Madu Alas Paser
            </h2>

            <div className="w-16 h-1 bg-amber-500 rounded-full mt-6 mb-6" />

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {setting?.aboutDescription ||
                "Madu Alas Paser merupakan UMKM lokal yang menyediakan madu hutan asli dari wilayah Paser, Kalimantan Timur."}
            </p>

            <p className="mt-5 text-gray-600 leading-relaxed">
              Kami menghadirkan produk madu pilihan dengan
              mengutamakan kualitas, keaslian, dan hasil
              dari alam lokal Paser.
            </p>

          </div>


          {/* Visual */}

          <div className="relative">

          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-amber-100">

            {setting?.aboutImageUrl ? (

              <img
                src={setting.aboutImageUrl}
                alt="Madu Alas Paser"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center">

                <div className="text-center px-8">

                  <div className="text-7xl mb-5">
                    🍯
                  </div>

                  <p className="text-amber-900 text-xl md:text-2xl font-bold">
                    Madu Asli Paser
                  </p>

                  <p className="text-amber-800/70 mt-2">
                    Dari alam untuk keluarga
                  </p>

                </div>

              </div>

            )}

          </div>


            {/* Decorative Card */}

            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-5 py-4">

              <p className="text-xs text-gray-500">
                Produk Lokal
              </p>

              <p className="font-bold text-gray-900">
                Paser, Kalimantan Timur
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}