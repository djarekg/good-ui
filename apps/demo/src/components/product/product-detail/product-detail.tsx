import { isEmpty } from '@/core/utils/object.js';
import type { ProductModel } from '@gui/api';
import { Grid } from '@mui/material';
import type { FC } from 'react';

type ProductDetailProps = {
  product: ProductModel | null;
};

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  if (isEmpty(product)) return null;

  const { id } = product;

  return (
    <Grid>
      <form>{id}</form>
    </Grid>
  );
};

export default ProductDetail;
