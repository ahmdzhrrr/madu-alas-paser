import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faSeedling,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

export default function Features({
  setting
}: {
  setting: any;
}) {
  const features = [
    {
      icon: faLeaf,
      title:
        setting?.feature1 ||
        "100% Madu Asli",
      description:
        "Madu pilihan dengan kualitas dan keaslian yang terjaga dari sumber lokal Paser.",
    },
    {
      icon: faSeedling,
      title:
        setting?.feature2 ||
        "Dipanen Langsung",
      description:
        "Dipanen langsung dari sumber madu pilihan untuk menjaga kualitas dan kesegarannya.",
    },
    {
      icon: faTruck,
      title:
        setting?.feature3 ||
        "Pengiriman Seluruh Indonesia",
      description:
        "Nikmati Madu Alas Paser dari mana saja dengan layanan pengiriman ke berbagai wilayah Indonesia.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-amber-600 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Keunggulan Kami
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {setting?.featureTitle ||
              "Mengapa Memilih Kami?"}
          </h2>

        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-14">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-amber-50/60 border border-amber-100 rounded-3xl p-8 md:p-10 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >

              {/* Number */}
              <span className="absolute top-6 right-7 text-sm font-bold text-amber-200">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-600 text-2xl group-hover:scale-110 transition-transform">
                <FontAwesomeIcon
                  icon={feature.icon}
                />
              </div>

              {/* Title */}
              <h3 className="mt-7 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Accent */}
              <div className="mt-6 mx-auto w-10 h-1 bg-amber-500 rounded-full group-hover:w-16 transition-all duration-300" />

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}