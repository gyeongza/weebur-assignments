import { notFound } from 'next/navigation';
import { HomeApi } from './_api';
import ProductList from './_components/product-list';
import { ProductsResponse } from './_type';

export default async function ProductPage() {
  let productList: ProductsResponse | null = null;

  try {
    productList = await HomeApi.getProducts();
  } catch (error) {
    console.error(error);
  }

  if (!productList) {
    return <div>상품을 불러오지 못했습니다</div>;
  }

  return (
    <div className="container mx-auto max-w-screen-xl p-4">
      <h4 className="text-2xl font-bold">위버 24시간 특가</h4>
      <ProductList productList={productList} />
    </div>
  );
}
