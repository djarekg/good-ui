import Customers from '@/routes/customers/customers';
import Home from '@/routes/home';
import Products from '@/routes/products/products';
import Root from '@/routes/root';
import Users from '@/routes/users/users';
import { createBrowserRouter } from 'react-router';

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
