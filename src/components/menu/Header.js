import { useContext } from 'react';
import styles from './Header.module.css';
import { Button, Box } from '@mui/material';
import AuthContext from '../store/auth-context';

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <nav className={styles.header}>
      {authCtx.isLoggedIn && (
        <Box className={styles.box}>
          <a href='/' className={styles.input}>
            Users
          </a>
          <a href='/' className={styles.input}>
            Admins
          </a>
          <Button
            onClick={authCtx.onLogout}
            className={styles.menuBtn}
            variant='contained'
          >
            Logout
          </Button>
        </Box>
      )}
    </nav>
  );
};

export default Header;
