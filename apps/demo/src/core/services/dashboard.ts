import useApi from '@/core/hooks/use-api.js';
import type {
  ProductTypeTotalByMonthModel,
  ProductTypeTotalModel,
  TopSellerModel,
  TotalQuantitySoldModel,
  TotalSalesModel,
} from '@gui/api';

export const getTopSellers = (year: number) => {
  const { get } = useApi();

  return get<TopSellerModel[]>(`/dashboard/top-sellers/${year}`);
};

export const getTopSellingProductTypes = (year: number) => {
  const { get } = useApi();

  return get<ProductTypeTotalModel[]>(`/dashboard/top-selling-product-types/${year}`);
};

export const getTotalSales = (year: number) => {
  const { get } = useApi();

  return get<TotalSalesModel>(`/dashboard/total-sales/${year}`);
};

export const getTotalQuantitySold = (year: number) => {
  const { get } = useApi();

  return get<TotalQuantitySoldModel>(`/dashboard/total-quantity-sold/${year}`);
};

export const getTotalProductTypeSalesByMonth = (year: number) => {
  const { get } = useApi();

  return get<ProductTypeTotalByMonthModel[]>(
    `/dashboard/total-product-type-sales-by-month/${year}`
  );
};
