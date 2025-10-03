import useApi from '@/core/hooks/use-api.js';
import type { ProductModel } from '@gui/api';

export const getProducts = () => {
  const { get } = useApi();
  return get<ProductModel[]>('/products');
};

export const getProduct = (id: string) => {
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
