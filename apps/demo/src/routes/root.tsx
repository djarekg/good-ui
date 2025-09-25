import Header from '@/layout/header.tsx';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
