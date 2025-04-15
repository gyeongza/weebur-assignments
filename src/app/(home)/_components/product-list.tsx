import { ProductsResponse } from '../_type';
import ProductCard from './product-card';

export default function ProductList({
  productList,
}: {
  productList: ProductsResponse;
}) {
  return (
    <div>
      {productList.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
