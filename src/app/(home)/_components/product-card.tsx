'use client';

import Image from 'next/image';
import { Product } from '../_type';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-md p-4">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={50}
        height={50}
        className="object-cover rounded-md"
      />
      <h1 className="text-lg font-bold">{product.title}</h1>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="text-sm text-gray-500">Reviews: {product.reviews}</p>
      <p className="text-sm text-gray-500">Rating: {product.rating}</p>
    </div>
  );
}
