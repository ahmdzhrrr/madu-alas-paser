export default function Features({
  setting
}: {
  setting: any;
}) {
  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          {setting?.featureTitle ||
            "Mengapa Memilih Kami?"}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-6 rounded-xl shadow">
            {setting?.feature1 ||
              "🌿 100% Madu Asli"}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            {setting?.feature2 ||
              "🐝 Dipanen Langsung"}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            {setting?.feature3 ||
              "🚚 Pengiriman Seluruh Indonesia"}
          </div>

        </div>

      </div>

    </section>
  );
}