import { externalApi } from '@/app/_lib/axios';
import { Product, ProductsResponse } from '@/app/(home)/_type';

export interface ProductRaw {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = Number(searchParams.get('skip') || '0');
    const limit = Number(searchParams.get('limit') || '20');

    const res = await externalApi.get('/products', {
      params: { skip, limit },
    });

    const formattedProducts: Product[] = res.data.products.map((product: ProductRaw) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      rating: product.rating,
      reviews: product.reviews.length,
    }));

    const response: ProductsResponse = {
      products: formattedProducts,
      total: res.data.total,
      skip: skip,
      limit: limit,
    };

    return Response.json(response);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
