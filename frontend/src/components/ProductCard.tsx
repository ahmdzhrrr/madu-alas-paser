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
  className="block"
>
  <div className="bg-white rounded-xl shadow">

    <img
      src={
        product.imageUrl ||
        "https://placehold.co/600x400"
      }
      alt={product.name}
      className="h-52 w-full object-cover rounded-t-xl"
    />

    <div className="p-4">

      <h3 className="font-bold text-lg">
        {product.name}
      </h3>

      <p className="text-gray-500">
        {product.category.name}
      </p>

      <p className="text-xl font-bold text-amber-700 mt-3">
        Rp {Number(product.price)
          .toLocaleString("id-ID")}
      </p>

    </div>

  </div>
</Link>
  );
}