import { isEmpty } from '@/core/utils/object.js';
import type { ProductModel } from '@gui/api';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
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
          borderRadius: '12px',
          willChange: 'box-shadow',
          ':hover': {
            boxShadow: 'var(--mui-shadows-4)',
            transition: 'box-shadow 200ms ease-in-out',
          },
          // ':hover': { transform: 'scale(1.05)', transition: 'transform 200ms ease-in-out' },
        }}
      >
        <img
          srcSet={`${imageUrl}?w=124&fit=crop&auto=format&dpr=2 2x`}
          src={`${imageUrl}?w=124&fit=crop&auto=format`}
          alt={type}
          loading="lazy"
          style={{ borderRadius: '8px' }}
        />
        <ImageListItemBar
          title={name}
          subtitle={description}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${type}`}
              onClick={() => handleCardClick(id)}
            >
              <ManageSearchOutlinedIcon />
            </IconButton>
          }
        />
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
