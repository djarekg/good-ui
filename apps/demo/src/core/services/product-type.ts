import { ProductType } from '@gui/api';

export const getProductTypes = () => {
  return Object.keys(ProductType).map((key) => key as ProductType);
};
