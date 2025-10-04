import type { ProductModel } from '@gui/api';
import { Card, CardHeader } from '@mui/material';
import type { FC } from 'react';

type ProductListProps = {
  products: ProductModel[] | null;
  onChange?: (id: string) => void;
};

const ProductList: FC<ProductListProps> = ({ products, onChange }) => {
  const handleCardClick = (id: string) => {
    onChange?.(id);
  };

  return (
    <>
      {products?.map(({ id, name }) => {
        return (
          <Card onClick={() => handleCardClick(id)}>
            <CardHeader>{name}</CardHeader>
          </Card>
        );
      })}
    </>
  );
};

export default ProductList;
