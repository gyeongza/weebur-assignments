import ProductList from './_components/product-list';

export default async function ProductPage() {
  return (
    <div className="container mx-auto max-w-screen-xl p-4">
      <h4 className="text-2xl font-bold">위버 24시간 특가</h4>
      <ProductList />
    </div>
  );
}
