import { getProductTypes } from '@/core/services/product-type.js';
import type { ProductType } from '@gui/api';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import type { FC } from 'react';

type ProductTypeSelectProps = {
  onChange?: (type: ProductType) => void;
};

const ProductTypeSelect: FC<ProductTypeSelectProps> = ({ onChange }) => {
  const productTypes = getProductTypes();

  const handleCardClick = (type: ProductType) => {
    onChange?.(type);
  };

  const renderCard = (type: ProductType) => {
    const imageUrl = `/product-types/${type.toLocaleLowerCase()}.jpeg`;

    return (
      <ImageListItem
        key={type}
        sx={{
          cursor: 'pointer',
          willChange: 'transform',
          ':hover': {
            transform: 'scale(1.06)',
            transition: 'transform 200ms ease-in-out',
          },
        }}
        onClick={() => handleCardClick(type)}
      >
        <img
          srcSet={`${imageUrl}?w=124&fit=crop&auto=format&dpr=2 2x`}
          src={`${imageUrl}?w=124&fit=crop&auto=format`}
          alt={type}
          loading="lazy"
        />
        <ImageListItemBar title={type} />
      </ImageListItem>
    );
  };

  return (
    <Box paddingInline={4}>
      <ImageList cols={5} gap={18} sx={{ width: '100%' }}>
        {productTypes.map(renderCard)}
      </ImageList>
    </Box>
  );
};

export default ProductTypeSelect;
