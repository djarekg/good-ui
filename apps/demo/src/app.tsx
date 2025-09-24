import { RouterProvider } from 'react-router';
import './app.css';
import router from './router';

const App = () => {
  return <RouterProvider router={router} />;
};

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default App;
