import ErrorMessage from '@/components/error/error-message.js';
import Loader from '@/components/loader/loader.js';
import ProductDetail from '@/components/product/product-detail/product-detail.js';
import ProductList from '@/components/product/product-list/product-list.js';
import ProductTypeSelect from '@/components/product/product-type-select/product-type-select.js';
import { useResource } from '@/core/hooks/use-resource.js';
import { getProduct, getProductsByType } from '@/core/services';
import type { ProductModel, ProductType } from '@gui/api';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';

const steps = ['Select product type', 'Select product', 'Product detail'];

const StepType = {
  productType: 0,
  products: 1,
  product: 2,
} as const;

type StepType = (typeof StepType)[keyof typeof StepType];

const Products = () => {
  const [activeStep, setActiveStep] = useState<StepType>(StepType.productType);
  const [productType, setProductType] = useState<ProductType | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  const {
    data: products,
    error: productTypeError,
    loading: productTypeLoading,
  } = useResource(
    {
      defaultValue: [] as ProductModel[],
      params: () => productType,
      loader: (type) => getProductsByType(type),
    },
    [productType]
  );

  const {
    data: product,
    error: productError,
    loading: productLoading,
  } = useResource({
    params: () => productId,
    loader: (id) => getProduct(id),
  });

  if (productTypeLoading) return <Loader />;
  if (productTypeError) return <ErrorMessage message={productTypeError.message} />;

  const handleProductTypeChange = (type: ProductType) => {
    setProductType(type);
    setActiveStep(StepType.products);
  };

  const handleProductChange = (id: string) => {
    setProductId(id);
    setActiveStep(StepType.product);
  };

  const renderContent = (step: StepType) => {
    switch (step) {
      case StepType.productType:
        return <ProductTypeSelect onChange={handleProductTypeChange} />;
      case StepType.products:
        return <ProductList products={products} onChange={handleProductChange} />;
      case StepType.product:
        return <ProductDetail product={product} />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderContent(activeStep)}
    </Box>
  );
};

export default Products;
