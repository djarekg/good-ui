import { isEmpty } from '@/core/utils/object.js';
import type { ProductModel } from '@gui/api';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import type { FC } from 'react';

type ProductListProps = {
  products: ProductModel[] | null;
  onChange?: (id: string) => void;
};

const ProductList: FC<ProductListProps> = ({ products, onChange }) => {
  const handleCardClick = (id: string) => {
    onChange?.(id);
  };

  if (isEmpty(products)) return <div>no data</div>;

  const renderCard = (product: ProductModel) => {
    const { id, name, description, productType: type } = product;
    const imageUrl = `/product-types/${type.toLocaleLowerCase()}.jpeg`;

    return (
      <ImageListItem
        key={type}
        sx={{
          cursor: 'pointer',
          willChange: 'transform',
          ':hover': {
            transform: 'scale(1.06)',
            transition: 'transform 300ms ease-in-out',
          },
        }}
        onClick={() => handleCardClick(id)}
      >
        <img
          srcSet={`${imageUrl}?w=124&fit=crop&auto=format&dpr=2 2x`}
          src={`${imageUrl}?w=124&fit=crop&auto=format`}
          alt={type}
          loading="lazy"
        />
        <ImageListItemBar title={name} subtitle={description} />
      </ImageListItem>
    );
  };

  return (
    <Box paddingInline={4}>
      <ImageList cols={5} gap={18} sx={{ width: '100%' }}>
        {products.map(renderCard)}
      </ImageList>
    </Box>
  );
};

export default ProductList;
