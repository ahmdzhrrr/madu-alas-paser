import { useEffect, useState } from "react";
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

    if (slides.length === 0)
      return;

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

    <section className="relative h-[500px] overflow-hidden">

      <img
        src={slide.imageUrl}
        alt={slide.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

        <div className="text-center text-white px-6">

          <h1 className="text-4xl md:text-6xl font-bold mb-4">

            {slide.title}

          </h1>

          {slide.subtitle && (

            <p className="text-lg md:text-2xl">

              {slide.subtitle}

            </p>

          )}

        </div>

      </div>

      {/* Indicator */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">

        {slides.map((_, index) => (

          <button
            key={index}
            onClick={() =>
              setCurrentIndex(index)
            }
            className={`w-3 h-3 rounded-full ${
              currentIndex === index
                ? "bg-white"
                : "bg-white/50"
            }`}
          />

        ))}

      </div>

    </section>

  );

}