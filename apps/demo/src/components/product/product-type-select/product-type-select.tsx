import { getProductTypes } from '@/core/services/product-type.js';
import type { ProductType } from '@gui/api';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import type { FC } from 'react';

type ProductTypeSelectProps = {
  onChange?: (type: ProductType) => void;
};

const ProductTypeSelect: FC<ProductTypeSelectProps> = ({ onChange }) => {
  const productTypes = getProductTypes();

  const handleCardClick = (type: ProductType) => {
    onChange?.(type);
  };

  const renderCard = (productType: ProductType) => {
    const imageUrl = `/product-types/${productType.toLocaleLowerCase()}.jpeg`;

    return (
      <Card variant="outlined" onClick={() => handleCardClick(productType)}>
        <CardContent>
          <Typography variant="h5" component="div">
            {productType}
          </Typography>
          <CardMedia sx={{ height: 100 }} image={imageUrl} title={productType} />
        </CardContent>
      </Card>
    );
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        width: '100%',
      }}
    >
      {productTypes.map(renderCard)}
    </Box>
  );
};

export default ProductTypeSelect;
