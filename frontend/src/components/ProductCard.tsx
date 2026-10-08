import type { Product } from "../types/product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
    >
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-amber-50">

          <img
            src={
              product.imageUrl ||
              "https://placehold.co/600x400"
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Badge */}
          {product.category?.name && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                {product.category.name}
              </span>
            </div>
          )}

        </div>

        {/* Content */}
        <div className="p-6">

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            {product.category.name}
          </p>

          <div className="flex items-end justify-between gap-4 mt-5">

            <div>
              <p className="text-xs text-gray-400 mb-1">
                Harga
              </p>

              <p className="text-xl font-bold text-amber-700">
                Rp{" "}
                {Number(product.price).toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>

            <span className="text-sm font-semibold text-amber-600 group-hover:text-amber-700 group-hover:translate-x-1 transition-all">
              Lihat →
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}