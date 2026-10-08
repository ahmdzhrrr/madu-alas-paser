import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  isActive: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {
      const response =
        await api.get("/testimonials");

      const activeTestimonials =
        response.data.filter(
          (testimonial: Testimonial) =>
            testimonial.isActive
        );

      setTestimonials(activeTestimonials);
    } catch (error) {
      console.error(error);
    }
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-amber-600 uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Testimoni Pelanggan
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Apa Kata Mereka?
          </h2>

          <p className="mt-5 text-gray-500 text-base md:text-lg leading-relaxed">
            Pengalaman pelanggan menikmati Madu Alas Paser.
          </p>

        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-14">

          {testimonials.map(
            (testimonial, index) => (
              <div
                key={testimonial.id}
                className="group relative bg-amber-50/60 border border-amber-100 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >

                {/* Number */}
                <span className="absolute top-6 right-7 text-sm font-bold text-amber-200">
                  0{index + 1}
                </span>

                {/* Quote */}
                <div className="text-5xl leading-none text-amber-300 font-serif">
                  “
                </div>

                {/* Rating */}
                <div className="flex gap-1 mt-3 mb-5 text-amber-500">
                  {Array.from({
                    length: testimonial.rating
                  }).map((_, starIndex) => (
                    <span key={starIndex}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed min-h-[100px]">
                  {testimonial.content}
                </p>

                {/* Customer */}
                <div className="mt-7 pt-5 border-t border-amber-100">
                  <p className="font-bold text-gray-900">
                    {testimonial.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Pelanggan Madu Alas Paser
                  </p>
                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}