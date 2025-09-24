import { Outlet } from 'react-router';

const Root = () => {
  return (
    <>
      <header>
        Header
      </header>
      <Outlet />
    </>
  );
};

export default Root;
