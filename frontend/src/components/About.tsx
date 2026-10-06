export default function About({
  setting
}: {
  setting: any;
}) {
  return (
    <section className="py-20">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          {setting?.aboutTitle ||
            "Tentang Madu Alas Paser"}
        </h2>

        <p className="mt-8 text-center text-gray-600">
          {setting?.aboutDescription ||
            "Madu Alas Paser merupakan UMKM lokal yang menyediakan madu hutan asli dari wilayah Paser, Kalimantan Timur."}
        </p>

      </div>

    </section>
  );
}