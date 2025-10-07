import ErrorMessage from '@/components/error/error-message.js';
import ClothIcon from '@/components/icons/cloth.js';
import ShirtIcon from '@/components/icons/shirt.js';
import ShirtsIcon from '@/components/icons/shirts.js';
import Loader from '@/components/loader/loader.js';
import ProductDetail from '@/components/product/product-detail/product-detail.js';
import ProductList from '@/components/product/product-list/product-list.js';
import ProductTypeSelect from '@/components/product/product-type-select/product-type-select.js';
import { useResource } from '@/core/hooks/use-resource.js';
import { getProduct, getProductsByType } from '@/core/services';
import type { ProductModel, ProductType } from '@gui/api';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Box, IconButton, Step, StepButton, Stepper } from '@mui/material';
import { useMemo, useState } from 'react';

const steps = [
  { label: 'Select product type', icon: <ClothIcon /> },
  { label: 'Select product', icon: <ShirtsIcon /> },
  { label: 'Product detail', icon: <ShirtIcon /> },
];

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1) as StepType);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) as StepType);
  };

  const handleStep = (step: StepType) => () => {
    setActiveStep(step);
  };

  const handleProductTypeChange = (type: ProductType) => {
    setProductType(type);
    setActiveStep(StepType.products);
  };

  const handleProductChange = (id: string) => {
    setProductId(id);
    setActiveStep(StepType.product);
  };

  const renderContent = useMemo(() => {
    switch (activeStep) {
      case StepType.productType:
        return <ProductTypeSelect onChange={handleProductTypeChange} />;
      case StepType.products:
        return <ProductList products={products} onChange={handleProductChange} />;
      case StepType.product:
        return <ProductDetail product={product} />;
      default:
        return null;
    }
  }, [activeStep, products, product]);

  return (
    <Box paddingInline={4} sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label, icon }, index) => (
          <Step key={label}>
            {/* <StepLabel>{label}</StepLabel> */}
            <StepButton color="inherit" icon={icon} onClick={handleStep(index as StepType)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <section style={{ display: 'flex', justifyContent: 'center', gap: '25rem' }}>
        <IconButton color="primary" size="large" onClick={handleBack}>
          <ArrowBackIosOutlinedIcon fontSize="large" />
        </IconButton>
        <IconButton color="primary" size="large" onClick={handleNext}>
          <ArrowForwardIosOutlinedIcon fontSize="large" />
        </IconButton>
      </section>
      {renderContent}
    </Box>
  );
};

export default Products;
