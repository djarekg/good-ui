import GhostIcon from '@/components/icons/ghost.tsx';
import { Button } from '@mui/material';
import { Link } from 'react-router';
import './header.css';

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <GhostIcon size={42} />
      </Link>
      <nav>
        <Button href='/users' color='primary'>Users</Button>
        <Button href='/customers' color='primary'>Customers</Button>
        <Button href='/products' color='primary'>Products</Button>
      </nav>
    </header>
  );
};

export default Header;
