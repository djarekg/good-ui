import Home from '@/routes/home';
import Root from '@/routes/root';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

const Users = lazy(() => import('@/routes/users/users'));
const Customers = lazy(() => import('@/routes/customers/customers'));
const Products = lazy(() => import('@/routes/products/products'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/products',
        element: <Products />,
      },
    ],
  },
]);

export default router;
