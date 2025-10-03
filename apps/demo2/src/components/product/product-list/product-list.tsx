import type { ProductModel } from '@gui/api';
import type { FC } from 'react';

type ProductListProps = {
  products: ProductModel[] | null;
};

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <>
      {products?.map(({ name }) => {
        <div>{name}</div>;
      })}
    </>
  );
};

export default ProductList;
