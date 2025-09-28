import GhostIcon from '@/components/icons/ghost.tsx';
import { Button } from '@mui/material';
import { Link } from 'react-router';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <GhostIcon size={42} />
      </Link>
      <nav className={styles.nav}>
        <Button href='/users' color='primary'>Users</Button>
        <Button href='/customers' color='primary'>Customers</Button>
        <Button href='/products' color='primary'>Products</Button>
      </nav>
    </header>
  );
};

export default Header;
