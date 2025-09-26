import useApi from '@/core/hooks/use-api.ts';
import type { TopSellerModel, TotalSalesModel } from '@gui/api';

export const getTopSellers = (year: number) => {
  const { get } = useApi();

  return get<TopSellerModel[]>(`/dashboard/top-sellers/${year}`);
};

export const getTotalSales = (year: number) => {
  const { get } = useApi();

  return get<TotalSalesModel>(`/dashboard/total-sales/${year}`);
};
