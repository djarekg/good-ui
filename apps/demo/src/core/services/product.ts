import useApi from '@/core/hooks/use-api.js';
import { isEmpty } from '@/core/utils/object.js';
import type { ProductModel, ProductType } from '@gui/api';

export const getProducts = () => {
  const { get } = useApi();
  return get<ProductModel[]>('/products');
};

export const getProductsByType = (type: ProductType | null) => {
  if (!type) return [];
  const { get } = useApi();
  return get<ProductModel[]>(`/products?productTypes=${type}`);
};

export const getProduct = (id: string | null) => {
  if (isEmpty(id)) return null;
  const { get } = useApi();
  return get<ProductModel>(`/products/${id}`);
};

export const updateProduct = (product: ProductModel) => {
  const { update } = useApi();
  return update<ProductModel>(`/products/${product.id}`, product);
};

export const removeProduct = (id: string) => {
  const { remove } = useApi();
  return remove(`/products/${id}`);
};
