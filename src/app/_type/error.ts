import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  error: string;
  statusCode?: number;
  details?: string;
  endpoint?: string;
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

export function isApiError(error: unknown): error is ApiError {
  return error instanceof Error && 'isAxiosError' in error && error.isAxiosError === true;
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }

    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          return '잘못된 요청입니다.';
        case 401:
          return '인증이 필요합니다.';
        case 403:
          return '접근 권한이 없습니다.';
        case 404:
          return '요청한 상품을 찾을 수 없습니다.';
        case 500:
          return '서버 오류가 발생했습니다.';
        case 503:
          return '서비스를 일시적으로 사용할 수 없습니다.';
        default:
          return `서버 오류가 발생했습니다 (${error.response.status})`;
      }
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
}
