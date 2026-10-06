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
    <section className="py-16 px-6 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">

          <h2 className="text-3xl md:text-4xl font-bold">
            Apa Kata Pelanggan?
          </h2>

          <p className="text-gray-600 mt-3">
            Pengalaman pelanggan menikmati Madu Alas Paser.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {testimonials.map((testimonial) => (

            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm p-6"
            >

              <div className="text-yellow-500 text-lg mb-4">
                {"★".repeat(testimonial.rating)}
              </div>

              <p className="text-gray-600 leading-relaxed mb-5">
                "{testimonial.content}"
              </p>

              <p className="font-semibold text-gray-900">
                — {testimonial.name}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}