import ErrorMessage from '@/components/error/error-message.js';
import Loader from '@/components/loader/loader.js';
import ProductList from '@/components/product/product-list/product-list.js';
import { useQuery } from '@/core/hooks/use-query.js';
import { getProducts } from '@/core/services';
import type { ProductModel } from '@gui/api';

const Products = () => {
  const { data, loading, error } = useQuery<ProductModel[]>({
    initialData: [],
    queryFn: () => getProducts(),
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <ProductList products={data} />
    </>
  );
};

export default Products;
