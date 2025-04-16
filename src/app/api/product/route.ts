import { externalApi } from '@/app/_lib/axios';
import { Product, ProductsResponse } from '@/app/(home)/_type';
import { PRODUCTS_PER_PAGE } from '@/app/(home)/_constants';
import { AxiosError } from 'axios';

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
    const limit = Number(searchParams.get('limit') || PRODUCTS_PER_PAGE);
    const q = searchParams.get('q')?.trim() || '';
    const sortBy = searchParams.get('sortBy')?.trim();
    const order = searchParams.get('order')?.trim();

    const isSearch = q.length > 0;

    const endpoint = isSearch ? '/products/search' : '/products';

    const res = await externalApi.get(endpoint, {
      params: {
        q: isSearch ? q : undefined,
        skip,
        limit,
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
    });

    const formattedProducts: Product[] = res.data.products.map((product: ProductRaw) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      rating: product.rating,
      reviews: product.reviews?.length ?? 0,
    }));

    const response: ProductsResponse = {
      products: formattedProducts,
      total: res.data.total,
      skip,
      limit,
    };

    return Response.json(response);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || '외부 API 호출 중 오류가 발생했습니다.';

        return Response.json(
          {
            error: message,
            statusCode: status,
            endpoint: error.config?.url,
          },
          { status: status },
        );
      } else if (error.request) {
        return Response.json(
          {
            error: '네트워크 오류가 발생했습니다.',
            statusCode: 503,
            details: error.message,
          },
          { status: 503 },
        );
      }
    }

    return Response.json(
      {
        error: '상품 정보를 가져오는 중 오류가 발생했습니다.',
        statusCode: 500,
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
