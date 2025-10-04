import { isEmpty } from '@/core/utils/object.js';
import type { ProductModel } from '@gui/api';
import type { FC } from 'react';

type ProductDetailProps = {
  product: ProductModel | null;
};

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  if (isEmpty(product)) {
    return null;
  }

  const { id } = product;

  return <form>{id}</form>;
};

export default ProductDetail;
