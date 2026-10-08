import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../services/api";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  isActive: boolean;
}

export default function Carousel() {

  const [slides, setSlides] =
    useState<Slide[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    loadSlides();
  }, []);

  useEffect(() => {

    if (slides.length <= 1) {
      return;
    }

    const interval =
      setInterval(() => {

        setCurrentIndex((prev) =>
          prev === slides.length - 1
            ? 0
            : prev + 1
        );

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [slides]);

  async function loadSlides() {

    try {

      const response =
        await api.get("/carousel");

      const activeSlides =
        response.data.filter(
          (slide: Slide) =>
            slide.isActive
        );

      setSlides(activeSlides);

    } catch (error) {

      console.error(error);

    }

  }

  if (slides.length === 0) {
    return null;
  }

  const slide =
    slides[currentIndex];

  return (

    <section className="relative h-[520px] md:h-[650px] overflow-hidden bg-gray-900">

      {/* Background Image */}

      <img
        src={slide.imageUrl}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
      />


      {/* Gradient Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />


      {/* Content */}

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex items-center">

        <div className="max-w-2xl text-white">

          <p className="text-amber-300 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-4">
            Madu Alas Paser
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            {slide.title}
          </h1>

          {slide.subtitle && (

            <p className="mt-5 text-base md:text-xl text-gray-200 leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

          )}


          {/* Buttons */}

          <div className="flex flex-wrap gap-3 mt-8">

            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition shadow-lg"
            >
              Lihat Produk
              <span className="ml-2">
                →
              </span>
            </Link>

            <Link
              to="/pesanan"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Lacak Pesanan
            </Link>

          </div>

        </div>

      </div>


      {/* Slide Indicator */}

      {slides.length > 1 && (

        <div className="absolute bottom-8 left-6 md:left-10 flex items-center gap-2">

          {slides.map((_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrentIndex(index)
              }
              aria-label={`Slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-10 bg-amber-400"
                  : "w-5 bg-white/50 hover:bg-white/80"
              }`}
            />

          ))}

        </div>

      )}


      {/* Slide Number */}

      {slides.length > 1 && (

        <div className="absolute bottom-8 right-6 md:right-10 text-white/80 text-sm">

          <span className="font-semibold">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>

          <span className="mx-2">
            /
          </span>

          <span>
            {String(slides.length).padStart(2, "0")}
          </span>

        </div>

      )}

    </section>

  );
}